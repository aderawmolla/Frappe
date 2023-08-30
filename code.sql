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

