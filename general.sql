
SELECT
DATE_FORMAT(mr.creation,‘%%d-%%m-%%Y’) as ‘MR Creation:MRCreation:100’,
mr.name as ‘MR Number:Link/Material Request:100’,
mr_item.project as’Project Name:Link/Project:100’,
(SELECT user.full_name FROM tabUser user WHERE user.name = mr_item.owner LIMIT 1) as ‘Requestor Name’,
mr_item.item_code as ‘Item Code:Link/Item:200’,
mr_item.qty as ‘Qty:Qty:75’,
(
CASE
WHEN mr_item.ordered_qty = 0 THEN ‘Pending’
WHEN mr_item.ordered_qty > 0 and mr_item.ordered_qty < mr_item.qty THEN ‘Partially Ordered’
WHEN mr_item.ordered_qty >= mr_item.qty and mr_item.ordered_qty > mr_item.received_qty THEN ‘Ordered’
WHEN mr_item.ordered_qty <= mr_item.received_qty THEN ‘Received’
ELSE ‘’

END
) as ‘MR Status’,
(SELECT
GROUP_CONCAT(user.full_name)
FROM tabToDo todo LEFT JOIN tabUser user ON (user.name = todo.owner)
WHERE
todo.reference_name = mr.name AND
(todo.owner = ‘komal@apaulsoftware.com’ OR todo.owner = ‘pe@apaulsoftware.com’ OR todo.owner = ‘avinash@apaulsoftware.com’)
) as ‘Assigned To:Assigned To:200’,
po_item.parent as ‘Purchase Order:Link/Purchase Order:120’,
po.supplier as ‘Supplier:Link/Supplier:200’,
po_item.qty as ‘PO Qty:PO Qty:75’,
po_item.received_qty as ‘Received Qty:Received Qty:75’,
po.status as ‘PO Status’,
DATE_FORMAT(po.creation,‘%%d-%%m-%%Y’) as ‘PO Creation:PO Creation:100’,
DATE_FORMAT(po_item.schedule_date,‘%%d-%%m-%%Y’) as ‘Required By:Required By:100’,
DATE_FORMAT(po_item.expected_delivery_date,‘%%d-%%m-%%Y’) as ‘Expected Delivery By:Expected Delivery By:100’,
(SELECT COUNT(pfol.discussion_summary) FROM tabPurchase Followup Item pfol where pfol.purchase_order_item = po_item.name and pfol.docstatus = 1) as ‘Followup Count:Followup Count/100’,
(SELECT pfol.discussion_summary FROM tabPurchase Followup Item pfol where pfol.docstatus = 1 and pfol.purchase_order_item = po_item.name ORDER BY pfol.creation DESC LIMIT 1) as ‘Latest Followup Summary:Latest Followup Summary/200’,
(SELECT pfol.owner FROM tabPurchase Followup Item pfol where pfol.docstatus = 1 and pfol.purchase_order_item = po_item.name ORDER BY pfol.creation DESC LIMIT 1) as ‘Follow Up By:Follow Up By/200’,
(SELECT pfol.status FROM tabPurchase Followup Item pfol where pfol.docstatus = 1 and pfol.purchase_order_item = po_item.name ORDER BY pfol.creation DESC LIMIT 1) as ‘Follow Up Status:Follow Up Status/200’,
(SELECT DATE_FORMAT(pfol.creation,‘%%d-%%m-%%Y’) FROM tabPurchase Followup Item pfol where pfol.docstatus = 1 and pfol.purchase_order_item = po_item.name ORDER BY pfol.creation DESC LIMIT 1) as ‘Last Follow Up:Last Follow Up/200’,
(SELECT pfol.next_follow_up_date FROM tabPurchase Followup Item pfol where pfol.docstatus = 1 and pfol.purchase_order_item = po_item.name ORDER BY pfol.creation DESC LIMIT 1) as ‘Next Follow Up:Next Follow Up/200’,
(SELECT pfol.revised_committed_date FROM tabPurchase Followup Item pfol where pfol.docstatus = 1 and pfol.purchase_order_item = po_item.name ORDER BY pfol.creation DESC LIMIT 1) as ‘Revised Committed Date:Revised Committed Date/200’

FROM
tabMaterial Request mr JOIN tabMaterial Request Item mr_item
LEFT JOIN tabPurchase Order Item po_item ON (mr_item.name = po_item.material_request_item and po_item.docstatus = 1)
LEFT JOIN tabPurchase Order po ON (po_item.parent = po.name and po.docstatus = 1)
WHERE
mr.name = mr_item.parent and mr.docstatus = 1 and mr.material_request_type = ‘Purchase’ and mr.parent = %(name)s`
