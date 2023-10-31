@frappe.whitelist()
# generally depends on the meathod in update item function it indicated child in set missing values indicates parent
# source_name------ means name of source document
# source_parent---- means parent document
# obj--------------specific row in the child table of the source_parent document.
# target-----------Represents a row (item) in the target child table
# doc--------------current document/generic criteria
#target_doc......... Optional parameter, likely representing an existing target document (a Stock Entry) to update.
def make_material_request(source_name, target_doc=None,purpose="Purchase"):
	def update_item(obj, target, source_parent):
		pass
	def set_missing_values(source, target):
		#in this case targer indicates targeted document
        # 
		target.material_request_type=purpose

	doclist = get_mapped_doc("Material Request", source_name, {
		"Material Request": {
			"doctype": "Material Request",
			"validation": {
				"docstatus": ["=", 1],
				"material_request_type": ["in", ["Material Transfer", "Material Issue", "Customer Provided"]]
			}
		},
		"Material Request Item": {
			"doctype": "Material Request Item",
			"field_map": {
				"name": "name",
				"parent": "parent",
				"uom": "uom"
			},
			"postprocess": update_item,
		}
	}, target_doc, set_missing_values)

	return doclist
