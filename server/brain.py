import anthropic
import config
from memory import Memory
import base64
from mcp_tools import get_native_tools_schema, execute_tool

# Use an empty string if no API key is set to avoid crashing on import.
client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY) if config.ANTHROPIC_API_KEY else None

SYSTEM_PROMPT = config.load_system_prompt()

def _extract_text(response) -> str:
    return "\n".join(b.text for b in response.content if getattr(b, "type", None) == "text").strip()

def think(user_text: str, memory: Memory, user_id: str = 'admin', company_id: str = 'BGK', model: str = None, image_base64: str = None, image_media_type: str = None) -> str:
    """
    Reason over the user's words plus rolling memory, with full live tool access.
    Supports Vision AI via optional image_base64 parameter.
    """
    if not client:
        return "⚠️ Error: Anthropic API Key is missing. Please configure it in the .env file."
        
    memory.add("user", user_text, user_id, company_id)
    messages = memory.recent_messages(limit=20, user_id=user_id, company_id=company_id)
    
    # If it's a vision task, we inject the image into the latest message
    if image_base64 and image_media_type:
        # We need to format the latest message as a list of content blocks
        latest_content = [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": image_media_type,
                    "data": image_base64,
                }
            },
            {
                "type": "text",
                "text": user_text
            }
        ]
        # Replace the last message content
        if messages and messages[-1]["role"] == "user":
            messages[-1]["content"] = latest_content
        else:
            messages.append({"role": "user", "content": latest_content})

    # Prepare tool arguments
    kwargs = {
        "model": model or config.BRAIN_MODEL,
        "max_tokens": 2048,
        "system": SYSTEM_PROMPT,
        "messages": messages,
    }
    
    # Prepare native tools
    kwargs["tools"] = get_native_tools_schema()

    try:
        response = client.messages.create(**kwargs)
        
        # Check if Claude decided to use a tool
        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if getattr(block, "type", None) == "tool_use":
                    result_text = execute_tool(block.name, block.input, memory, user_id, company_id)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result_text
                    })
            
            # Append Claude's partial response and our tool results, then call Claude again
            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": tool_results})
            
            kwargs["messages"] = messages
            response = client.messages.create(**kwargs)
            
        reply = _extract_text(response)
        memory.add("assistant", reply, user_id, company_id)
        return reply
    except Exception as e:
        return f"⚠️ Brain Error: {str(e)}"
