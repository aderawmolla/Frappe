
SELECT
    ts.project AS "Project:Link/Project:200",
    ts.date AS "Date:Date:100",
    ts.task_description AS "Type of Work:Data:150",
    ts.floor_function AS "Floor Function:Data:120",
    ts.floor_level AS "Floor Level:Data:200",
    ts.uom AS "Performance Unit:Date:100",
    ts.quantity_executed AS "Performance Output:120",
    md.unit_price AS "Material Used on site:120",
    md.total_cost AS "Remaining MAterialonsite :120",
    ts.material_supply_for_excuted_activity AS "Material Supply For Excuted Activity:Data:200",
    ts.note AS "Remark:Data:200"
FROM
    `tabTimesheet` ts
INNER JOIN
  (SELECT parent,uom,quantity FROM `tabMonthly Plan Detail` GROUP BY parent) task_used ON mp.name = task_used.parent

WHERE  
    ts.date >= %(from_date)s AND ts.date <= %(to_date)s;
