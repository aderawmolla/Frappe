SELECT 
    PlateNo AS "Plate No:Link/Equipment Birth Certificate Form",
    SUM(InsuranceCost) AS "Insurance Cost",
    SUM(FuelCost) AS "Fuel Cost",
    SUM(CompensationCost) AS "Compensation Cost",
    SUM(MaintenanceCost) AS "Maintenance Cost",
    SUM(TotalCost) AS "Total Cost"
FROM (
    (SELECT
        COALESCE(i.plate_no, mv.plate_no, fr.plate_no) AS PlateNo,
        SUM(i.maintainance_cost) AS InsuranceCost,
        SUM((fr.vehicle_km_litr + fr.others_liters_hr) * fr.rate) AS FuelCost,
        SUM(i.compansation_cost) AS CompensationCost,
        SUM(mv.cost_of_labors_and_items) AS MaintenanceCost,
        SUM(COALESCE(i.maintainance_cost, 0) + COALESCE(i.compansation_cost, 0) + COALESCE(mv.cost_of_labors_and_items, 0) + COALESCE((fr.vehicle_km_litr + fr.others_liters_hr) * fr.rate, 0)) AS TotalCost
    FROM 
        `tabFuel Request for Equipment Form` fr 
    LEFT JOIN
        `tabAccident Insurance Followup` i 
        ON i.plate_no = fr.plate_no
    LEFT JOIN 
        `tabMaintenance Visit` mv 
        ON i.plate_no = mv.plate_no
    GROUP BY COALESCE(i.plate_no, mv.plate_no, fr.plate_no))

    UNION ALL

    (SELECT
        COALESCE(i.plate_no, mv.plate_no, fr.plate_no) AS PlateNo,
        SUM(i.maintainance_cost) AS InsuranceCost,
        SUM((fr.vehicle_km_litr + fr.others_liters_hr) * fr.rate) AS FuelCost,
        SUM(i.compansation_cost) AS CompensationCost,
        SUM(mv.cost_of_labors_and_items) AS MaintenanceCost,
        SUM(COALESCE(i.maintainance_cost, 0) + COALESCE(i.compansation_cost, 0) + COALESCE(mv.cost_of_labors_and_items, 0) + COALESCE((fr.vehicle_km_litr + fr.others_liters_hr) * fr.rate, 0)) AS TotalCost
    FROM 
        `tabFuel Request for Equipment Form` fr 
    RIGHT JOIN
        `tabAccident Insurance Followup` i 
        ON i.plate_no = fr.plate_no
    RIGHT JOIN 
        `tabMaintenance Visit` mv 
        ON i.plate_no = mv.plate_no
    GROUP BY COALESCE(i.plate_no, mv.plate_no, fr.plate_no))
) AS CombinedResults;

