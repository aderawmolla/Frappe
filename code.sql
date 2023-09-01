
SELECT 
	dp.project AS "Project:Link/Project:120",
	dp.task AS "Task:Link/Task:120",
	dp.date AS "Date:Date:120",
	dp.unit AS "Unit:100",
	dp.quantity AS "Planned Quantity:100",
	dp.activity_total_cost AS "Planned Amount:100"
FROM 
	`tabDaily Plan` dp
WHERE 
	dp.date >= %(from_date)s AND dp.date <= %(to_date)s;

//cashflow  report
SELECT
    op.name AS "operational_plan:Link/Operational Plan:200",
    mp.name AS "monthly_plan:Link/Monthly Plan:200",
    mp.start_date AS "month_start_date:Date:Date:100",
    SUM( mp.material_total_cost) AS "Material Total Cost:Float:200",
    SUM( mp.equipment_total_cost) AS "Equipment Total Cost:Float:200",
    SUM(mp.man_power_total_cost) AS "Man power Total Cost:Float:200",
    (SUm(mp.material_total_cost) + SUM(mp.equipment_total_cost) +SUM( mp.man_power_total_cost)) AS total_outflow,
    (SUM(task_used.SUM_OF_TASK)) AS total_inflow, -- Placeholder for inflow calculation
    (SUM(task_used.SUM_OF_TASK) - (mp.material_total_cost + mp.equipment_total_cost + mp.man_power_total_cost)) AS net_cashflow
FROM
    `tabOperational Plan` AS op
INNER JOIN
    `tabMonthly Plan` AS mp ON op.name = mp.operational_plan
INNER JOIN
  (SELECT parent,SUM(rate*amount) AS SUM_OF_TASK FROM `tabMonthly Plan Detail` GROUP BY parent) task_used ON mp.name = task_used.parent
WHERE
        mp.start_date >= %(from_date)s
        AND mp.start_date <= %(to_date)s
        AND op.project = %(project)s  
GROUP BY
op.name,mp.name
ORDER BY
    op.name, mp.start_date;

SELECT
    dp.project AS "Project:Link/Project:200",
    dp.task AS "Task:Link/Task:200",
    COALESCE(SUM(manpower_planned.qty), 0) AS "Manpower Planned:Float:200",
    COALESCE(SUM(manpower_used.qty), 0) AS "Manpower Used:Float:200",
    COALESCE(SUM(material_planned.qty), 0) AS "Material Planned:Float:200",
    COALESCE(SUM(material_used.qty), 0) AS "Material Used:Float:200",
    COALESCE(SUM(machinery_planned.qty), 0) AS "Machinery Planned:Float:200",
    COALESCE(SUM(machinery_used.qty), 0) AS "Machinery Used:Float:200"
FROM
    `tabDaily Plan` dp
JOIN
    `tabTimesheet` ts ON dp.task = ts.task_name
LEFT JOIN
    (SELECT parent, SUM(qty) AS qty FROM `tabManpower Detail` GROUP BY parent) manpower_planned ON dp.name = manpower_planned.parent 
LEFT JOIN
    (SELECT parent, SUM(qty) AS qty FROM `tabManpower Detail` GROUP BY parent) manpower_used ON ts.name = manpower_used.parent 
LEFT JOIN
    (SELECT parent, SUM(qty) AS qty FROM `tabMaterial Detail` GROUP BY parent) material_planned ON dp.name = material_planned.parent
LEFT JOIN
    (SELECT parent, SUM(qty) AS qty FROM `tabMaterial Detail` GROUP BY parent) material_used ON ts.name = material_used.parent
LEFT JOIN
    (SELECT parent, SUM(qty) AS qty FROM `tabMachinery Detail2` GROUP BY parent) machinery_planned ON dp.name = machinery_planned.parent
LEFT JOIN
    (SELECT parent, SUM(qty) AS qty FROM `tabMachinery Detail2` GROUP BY parent) machinery_used ON ts.name = machinery_used.parent
GROUP BY
    dp.project, dp.task;
//project progress report
SELECT
    pr.name AS "Project:Link/Project:100",
    pr.estimated_cost AS "Agreement Amount:Currency:120",
    SUM(ts.total_cost_with_indirect_cost) AS "Executed Amount:Currency:100",
	pr.estimated_cost - SUM(ts.total_cost_with_indirect_cost) AS "Remaining Amount",
	(SUM(ts.total_cost_with_indirect_cost)  /pr.estimated_cost ) * 100 AS "Percentage Completed:Percent"
FROM
    `tabProject` pr
JOIN
    `tabTimesheet` ts ON pr.name = ts.project
GROUP BY
    pr.name, pr.estimated_cost;
//material scheduling report
SELECT
    dp.project AS "Project:Link/Project:100",
    md.id_mat AS "Material Name:Link/Task:150",
    dp.task_name1 AS "Task:Link/Task:120",
	md.uom AS "Unit:Link/UOM",
    dp.date AS "Date:Date:100",
    md.qty AS "Planned Quantity:Float:120",
    md.unit_price AS "Unit Price:120",
    md.total_cost AS "Planned Amount:Currency:120"
FROM
    `tabDaily Plan` dp
JOIN
    `tabMaterial Detail` md ON dp.name = md.parent
WHERE  
    dp.date >= %(from_date)s AND dp.date <= %(to_date)s;
//mapower scheduling report
SELECT
    dp.project AS "Project:Link/Project:100",
    md.job_title AS "Man Power Title:Link/Task:150",
    dp.task_name1 AS "Task:Link/Task:120",
    dp.date AS "Date:Date:100",
    md.qty AS "Planned Quantity:Float:120",
    dp.man_power_unit_rate AS "Rate:120",
    md.total_hourly_cost AS "Planned Amount:Currency:120"
FROM
    `tabDaily Plan` dp
JOIN
    `tabManpower Detail` md ON dp.name = md.parent
WHERE  
    dp.date >= %(from_date)s AND dp.date <= %(to_date)s;
//machinery scheduig report
SELECT
    dp.project AS "Project:Link/Project:100",
    md.id_mac AS "Material Name:Link/Machinery:150",
    dp.task_name1 AS "Task:Link/Task:120",
    dp.date AS "Date:Date:100",
    md.qty AS "Planned Quantity:Float:120",
    md.efficency AS "Rate:120",
    md.total_hourly_cost AS "Planned Amount:Currency:120"

FROM
    `tabDaily Plan` dp
JOIN
    `tabMachinery Detail2` md ON dp.name = md.parent
WHERE  
    dp.date >= %(from_date)s AND dp.date <= %(to_date)s;
//machinery scheduling report
SELECT
    dp.project AS "Project:Link/Project:100",
    md.id_mac AS "Material Name:Link/Machinery:150",
    dp.task_name1 AS "Task:Link/Task:120",
    dp.date AS "Date:Date:100",
    md.qty AS "Planned Quantity:Float:120",
    md.efficency AS "Rate:120",
    md.total_hourly_cost AS "Planned Amount:Currency:120"

FROM
    `tabDaily Plan` dp
JOIN
    `tabMachinery Detail2` md ON dp.name = md.parent
WHERE  
    dp.date >= %(from_date)s AND dp.date <= %(to_date)s;
//periodic plan report
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
//cashflow report
SELECT
    op.name AS "operational_plan:Link/Operational Plan:200",
    mp.name AS "monthly_plan:Link/Monthly Plan:200",
    mp.start_date AS "month_start_date:Date:Date:100",
    mp.material_total_cost AS material_total_cost,
    mp.equipment_total_cost AS equipment_total_cost,
    mp.man_power_total_cost AS man_power_total_cost,
    (mp.material_total_cost + mp.equipment_total_cost + mp.man_power_total_cost) AS total_outflow,
    0 AS total_inflow, -- Placeholder for inflow calculation
    (0 - (mp.material_total_cost + mp.equipment_total_cost + mp.man_power_total_cost)) AS net_cashflow
FROM
    `tabOperational Plan` AS op
INNER JOIN
    `tabMonthly Plan` AS mp ON op.name = mp.operational_plan
WHERE
    op.start_date > %s
    AND op.end_date <= %s
    AND op.project = %s
ORDER BY
    op.name, mp.start_date;

