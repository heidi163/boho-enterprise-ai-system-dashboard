import os
from dotenv import load_dotenv
load_dotenv()

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
BRAIN_MODEL = os.environ.get("BOHO_BRAIN_MODEL", "claude-opus-4-8")
FAST_MODEL = os.environ.get("BOHO_FAST_MODEL", "claude-sonnet-4-6")
MCP_BETA = "mcp-client-2025-11-20"

MCP_SERVERS = [
    {"type": "url", "url": "https://app.metorik.com/mcp", "name": "metorik",
     "authorization_token": os.environ.get("METORIK_TOKEN", "")},
    {"type": "url", "url": "https://mcp.windsor.ai/sse", "name": "windsor",
     "authorization_token": os.environ.get("WINDSOR_TOKEN", "")},
    {"type": "url", "url": os.environ.get("WORDPRESS_MCP_URL", ""), "name": "wordpress",
     "authorization_token": os.environ.get("WORDPRESS_MCP_TOKEN", "")},
    {"type": "url", "url": os.environ.get("SHOPIFY_MCP_URL", ""), "name": "shopify",
     "authorization_token": os.environ.get("SHOPIFY_MCP_TOKEN", "")},
]
MCP_SERVERS = [s for s in MCP_SERVERS if s["url"]]
MCP_TOOLSETS = [{"type": "mcp_toolset", "mcp_server_name": s["name"]} for s in MCP_SERVERS]

def load_system_prompt() -> str:
    prompt_path = os.path.join(os.path.dirname(__file__), "prompts", "boho_system_prompt.txt")
    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()
