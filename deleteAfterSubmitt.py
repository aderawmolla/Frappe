def delete_linked_loading_advice(self):
		if self.loading_advice:
			loading_advice_doc = frappe.get_doc('Loading Advice', self.loading_advice)
			
			# Find all linked Delivery Notes
			linked_delivery_notes = frappe.get_all(
				'Delivery Note', 
				filters={'loading_advice': self.loading_advice},
				fields=['name']
			)
        
			# Unlink Loading Advice from all linked Delivery Notes
			for dn in linked_delivery_notes:
				dn_doc = frappe.get_doc('Delivery Note', dn.name)
				dn_doc.db_set('loading_advice', None)

			# Cancel and Delete the Loading Advice document
			if loading_advice_doc.docstatus == 1:  # Check if the document is submitted
				loading_advice_doc.cancel()
				loading_advice_doc.delete()
