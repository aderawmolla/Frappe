cur_frm.add_fetch("item_code", "item_name", "item_name");
cur_frm.add_fetch("item_code", "description", "description");
cur_frm.add_fetch("item_code", "stock_uom", "uom");
cur_frm.add_fetch("item_code", "location", "location");


frappe.ui.form.on('Maintenance Schedule', {

	po_no: function(frm) {
		if (frm.doc.po_no) {
			frm.clear_table('items_from_purchase_order');
			console.log("Test 1");
			frappe.model.with_doc('Purchase Order', frm.doc.po_no, function() {
				console.log("Test 2", frm.doc.po_no)
				let source_doc = frappe.model.get_doc('Purchase Order', frm.doc.po_no);
				console.log("source doc", source_doc)

				$.each(source_doc.items, function(index, source_row) {

					console.log("Test 3");
					const target_row = frm.add_child('items_from_purchase_order');
					target_row.item_code = source_row.item_code;
					target_row.stock_quantity = source_row.stock_quantity;
					target_row.item_name = source_row.item_name;
					target_row.uom = source_row.uom;
					target_row.amount = source_row.amount;
					target_row.qty = source_row.qty;
					target_row.rate = source_row.rate;
					target_row.description = source_row.description;

				});

				frm.refresh_field('items_from_purchase_order');
			});
		}
	},
});
frappe.ui.form.on('Maintenance Schedule Item', {
  //when equip_code of Tyre Control Table changes it fetches data from the database and assign to equp_type of table document rows
    item_code: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        // Fetch information from the linked doctype using a server call
        frappe.call({
            method: "frappe.client.get_value",
             args: {
                doctype: 'Stock Ledger Entry',
                filters: { item_code: child.item_code},
                fieldname: ['qty_after_transaction']
            },
            callback: function(response) {
                if (response.message) {
                // Update the "equipment_type" field in the current child table row
                   frappe.model.set_value(cdt, cdn, "stock_quantity", response.message.qty_after_transaction);
                   frappe.model.set_df_property(cdt, cdn,'stock_quantity', 'read_only', 1); // Make stock_quantity readonly
                    frm.refresh();
					//  frappe.model.set_value(d.doctype, d.name, 'ot_total_in_birr', (d.ot_normal_amount + d.ot_knight_

                }
            }
        });
    }});
frappe.ui.form.on('Purchase Order Item', {
  //when equip_code of Tyre Control Table changes it fetches data from the database and assign to equp_type of table document rows
    item_code: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        // Fetch information from the linked doctype using a server call
        frappe.call({
            method: "frappe.client.get_value",
             args: {
                doctype: 'Stock Ledger Entry',
                filters: { item_code: child.item_code},
                fieldname: ['qty_after_transaction']
            },
            callback: function(response) {
                if (response.message) {
                // Update the "equipment_type" field in the current child table row
                   frappe.model.set_value(cdt, cdn, "stock_quantity", response.message.qty_after_transaction);
                frappe.model.set_df_property(cdt, cdn,'stock_quantity', 'read_only', 1); // Make stock_quantity readonly
                    frm.refresh();
					//  frappe.model.set_value(d.doctype, d.name, 'ot_total_in_birr', (d.ot_normal_amount + d.ot_knight_

                }
            }
        });
    }});
