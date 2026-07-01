import os
import re

TARGET_DIR = "/Users/heidimedhat/Desktop/boho-enterprise-ai-system-dashboard/src"

REPLACEMENTS = {
    "indigo-": "blue-",
    "violet-": "sky-",
    "purple-": "sky-",
    "fuchsia-": "blue-",
    "bg-indigo-": "bg-blue-",
    "text-indigo-": "text-blue-",
    "border-indigo-": "border-blue-",
    "from-indigo-": "from-blue-",
    "to-indigo-": "to-blue-",
    "via-indigo-": "via-blue-",
    "ring-indigo-": "ring-blue-",
    "shadow-indigo-": "shadow-blue-",
    "#6366f1": "#3b82f6", # indigo-500 to blue-500
    "#4f46e5": "#2563eb", # indigo-600 to blue-600
    "#8b5cf6": "#0ea5e9", # violet-500 to sky-500
    "rgba(99,102,241": "rgba(59,130,246", # indigo rgb to blue rgb
    "rgba(139,92,246": "rgba(14,165,233", # violet rgb to sky rgb
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in REPLACEMENTS.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(TARGET_DIR):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
            process_file(os.path.join(root, file))

print("Color replacement complete.")
