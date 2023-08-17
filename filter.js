frappe.ui.form.on('Down Equipment Data Table', {
    // ... (other event handlers)
    plate_no: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        
        frappe.call({
            method: "frappe.client.get_value",
            args: {
                doctype: 'Equipment Birth Certificate Form',
                filters: { plate_no: child.plate_no },
                fieldname: ['equipment_type']
            },
            callback: function(response) {
                if (response.message && response.message.equipment_type) {
                    frappe.model.set_value(cdt, cdn, "equipment_type", response.message.equipment_type);
                }
            }
        });
    },
    status: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        var reason_options = [];
        
        if (child.status === 'Down') {
            reason_options = ['NONE', 'PM-Preventive  Maintainance', 'WP-Waiting For Pats', 'WM-Waiting for  MaaanPower', 'UR-Under Repair'];
        }
        else if (child.status === 'Idle') {
            reason_options = ['None', 'FL-Fuel/Lubricant Shortage', 'OP-Operator Problem', 'MO-Mobalization', 'WD-Waiting for Demobilization', 'FM-Force Majeure'];
        }
        
        frappe.meta.get_docfield(cdt, 'reason', frm.docname).options = reason_options.join("\n");
        frappe.model.set_value(cdt, cdn, 'reason', reason_options[0]);
    }
});

