--Daily plan report
SELECT 
	dp.project AS "Project:Link/Project:120",
	dp.task_name1 AS "Task:Link/Task:120",
	dp.date AS "Date:Date:120",
	dp.unit AS "Unit:100",
	dp.quantity AS "Planned Quantity:100",
	dp.activity_total_cost AS "Planned Amount:100"
FROM 
	`tabDaily Plan` dp
WHERE 
	dp.date >= %(from_date)s AND dp.date <= %(to_date)s;

--Daily work report
SELECT 
	ts.project AS "Project:Link/Project:120",
	ts.task_name1 AS "Task:Link/Task:120",
	ts.unit AS "Unit:Link/UOM:120",
	ts.date AS "Date:120",
	ts.executed_quantity AS "Executed Quantity:120",
	ts.activity_total_cost AS "Executed Amount:120"
FROM 
	`tabDaily Plan` ts;


--Periodic work report
SELECT 
    ts.project AS "Project:Link/Project:120",
    ts.task_name AS "Task:Link/Task:120",
    ts.date AS "Date:Date:120",
    ts.uom AS "Unit:Link/UOM:120",
    ts.executed_quantity AS "Executed Quantity:120",
    ts.activity_total_cost AS "Executed Amount:120"
FROM 
    `tabTimesheet` ts
WHERE  
    ts.date >= %(from_date)s AND ts.date <= %(to_date)s;
