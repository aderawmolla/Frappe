

frappe.ui.form.on('Maintenance Visit Purpose', {
    //when equip_code of Tyre Control Table changes it fetches data from the database and assign to equp_type of table document rows
    item_code: function (frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        // Fetch information from the linked doctype using a server call
        frappe.call({
            method: "frappe.client.get_value",
            args: {
                doctype: 'Item',
                filters: { item_code: child.item_code },
                fieldname: ['stock_uom']
            },
            callback: function (response) {
                if (response.message) {
                    // Update the "equipment_type" field in the current child table row
                    frappe.model.set_value(cdt, cdn, "uom", response.message.stock_uom);
                    frm.refresh();
                    //  frappe.model.set_value(d.doctype, d.name, 'ot_total_in_birr', (d.ot_normal_amount + d.ot_knight_

                }
            }
        }),
            frappe.call({
                method: "frappe.client.get_value",
                args: {
                    doctype: 'Item',
                    filters: { item_code: child.item_code },
                    fieldname: ['stock_uom']
                },
                callback: function (response) {
                    if (response.message) {
                        // Update the "equipment_type" field in the current child table row
                        frappe.model.set_value(cdt, cdn, "uom", response.message.stock_uom);
                        frm.refresh();
                        //  frappe.model.set_value(d.doctype, d.name, 'ot_total_in_birr', (d.ot_normal_amount + d.ot_knight_

                    }
                }
            });
    },
    qty: function (frm, cdt, cdn) {
        calculateCost(frm, cdt, cdn);

    },
    rate: function (frm, cdt, cdn) {
        calculateCost(frm, cdt, cdn);
    }
});
frappe.ui.form.on('Manpower Cost', {   
    no_of_labor: function (frm, cdt, cdn) {

        calculateCost2(frm, cdt, cdn);

    },
    rate: function (frm, cdt, cdn) {
        calculateCost2(frm, cdt, cdn);
    }
});
function calculateCost(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var cost = child.rate * child.qty;
    frappe.model.set_value(cdt, cdn, 'cost', cost);
    frm.refresh();
    calculateTotal(frm);
}
function calculateCost2(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var cost = child.rate * child.no_of_labor;
    frappe.model.set_value(cdt, cdn,'cost', cost);
    frm.refresh();
    calculateTotal(frm);

}
function calculateTotal(frm){
  console.log("excute maintainance schedule")
      var total_manpower = 0;
    $.each(frm.doc.manpower_cost, function(index, row) {
            total_manpower += row.cost;
        });
     frm.set_value("total_manpower_cost",total_manpower);
     var total_item= 0;
     $.each(frm.doc.purposes, function(index, row) {
            total_item += row.cost;
      });
    frm.set_value("total_item_cost",total_item);
    var manpowerAndItem=total_manpower + total_item;
    frm.set_value("cost_of_labor_and_items",manpowerAndItem);
    frm.refresh();
}
