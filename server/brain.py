import anthropic
import config
from memory import Memory

# Use an empty string if no API key is set to avoid crashing on import
client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY) if config.ANTHROPIC_API_KEY else None
SYSTEM_PROMPT = config.load_system_prompt()

def _extract_text(response) -> str:
    return "\n".join(
        b.text for b in response.content if getattr(b, "type", None) == "text"
    ).strip()

def think(user_text: str, memory: Memory, model: str | None = None) -> str:
    if not client:
        return "⚠️ Error: Anthropic API Key is missing. Please configure it in the .env file."
        
    memory.add("user", user_text)
    messages = memory.recent_messages(limit=20)
    
    kwargs = {
        "model": model or config.BRAIN_MODEL,
        "max_tokens": 2048,
        "system": SYSTEM_PROMPT,
        "messages": messages,
    }
    
    # Only add MCP arguments if we have servers configured
    if config.MCP_SERVERS:
        kwargs["mcp_servers"] = config.MCP_SERVERS
        kwargs["tools"] = config.MCP_TOOLSETS
        kwargs["betas"] = [config.MCP_BETA]
        
    try:
        if "betas" in kwargs:
            response = client.beta.messages.create(**kwargs)
        else:
            response = client.messages.create(**kwargs)
            
        reply = _extract_text(response)
        memory.add("assistant", reply)
        return reply
    except Exception as e:
        return f"⚠️ Brain Error: {str(e)}"
