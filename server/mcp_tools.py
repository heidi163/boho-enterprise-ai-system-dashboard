from memory import Memory
import random
import datetime

# Native Python implementations of the "Simulated" MCP Tools

def get_native_tools_schema():
    return [
        {
            "name": "fetch_sales_data",
            "description": "Fetch real-time sales data from the database for a specific store/company.",
            "input_schema": {
                "type": "object",
                "properties": {
                    "company_id": {"type": "string", "description": "The ID of the company (e.g. BGK, O2Nation, iFilter)."}
                },
                "required": ["company_id"]
            }
        },
        {
            "name": "manage_clickup_task",
            "description": "Create a new task or update an existing one in the project management system.",
            "input_schema": {
                "type": "object",
                "properties": {
                    "action": {"type": "string", "enum": ["create", "update"]},
                    "title": {"type": "string", "description": "Title of the task to create."},
                    "priority": {"type": "string", "enum": ["low", "medium", "high", "critical"]},
                    "task_id": {"type": "integer", "description": "ID of the task to update (only for action=update)."},
                    "status": {"type": "string", "description": "New status for the task (only for action=update)."}
                },
                "required": ["action"]
            }
        }
    ]

def execute_tool(tool_name: str, tool_args: dict, memory: Memory, user_id: str, company_id: str) -> str:
    if tool_name == "fetch_sales_data":
        target_company = tool_args.get("company_id", company_id)
        # Fetch from our SQLite database
        sales = memory.get_sales(company_id=target_company)
        
        # If DB is empty, generate simulated data and save it to simulate an active store
        if not sales:
            today = datetime.date.today().isoformat()
            simulated_revenue = random.uniform(1000, 50000)
            memory.add_sales_record("Revenue", simulated_revenue, today, target_company)
            memory.add_sales_record("Orders", int(simulated_revenue / 500), today, target_company)
            sales = memory.get_sales(company_id=target_company)
            
        return f"Sales Data for {target_company}:\n" + "\n".join([f"{s['name']}: {s['value']} (Date: {s['date']})" for s in sales])
        
    elif tool_name == "manage_clickup_task":
        action = tool_args.get("action")
        if action == "create":
            title = tool_args.get("title", "New Task")
            priority = tool_args.get("priority", "medium")
            memory.add_task(title, priority, user_id, company_id)
            return f"Successfully created task: '{title}' with priority {priority}."
        elif action == "update":
            task_id = tool_args.get("task_id")
            status = tool_args.get("status", "completed")
            if task_id:
                memory.update_task(task_id, status)
                return f"Successfully updated task #{task_id} to status '{status}'."
            return "Error: task_id is required for update action."
            
    return f"Error: Tool {tool_name} not found."
