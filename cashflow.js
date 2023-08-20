
frappe.ui.form.on('Cashflow Schedule', {
    start_date: fetchAndAssign,
    project: fetchAndAssign,
    end_date: fetchAndAssign,
});

function fetchAndAssign(frm) {
    if (frm) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Operational Plan',
                filters: {
                    'start_date': frm.doc.start_date ? ['>', frm.doc.start_date] : undefined,
                    'end_date': frm.doc.end_date ? ['<=', frm.doc.end_date] : undefined,
                    'project': frm.doc.project ? frm.doc.project : undefined,
                    'name': ['!=', frm.docname],
                },
            },
            callback: function (response) {
                if (response.message && Array.isArray(response.message)) {
                    var records = response.message;
                    if (records.length === 0) {
                        frm.clear_table('cashflow_table');
                        refresh_field('cashflow_table');
                    } else {
                        fetchAndLogAllFields(records[0].name, frm);
                    }
                }
            }
        });
    }
}

function fetchAndLogAllFields(utilizationRegisterName, frm) {
    frm.clear_table('cashflow_table');

    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Monthly Plan',
            filters: {
                'operational_plan': utilizationRegisterName,
            },
        },
        callback: function (response) {
            if (response.message && Array.isArray(response.message)) {
                var monthlyPlans = response.message;

                for (var i = 0; i < monthlyPlans.length; i++) {
                    (function (monthlyPlan) {
                        frappe.call({
                            method: 'frappe.client.get_value',
                            args: {
                                doctype: 'Monthly Plan',
                                filters: {
                                    'name': monthlyPlan.name,
                                },
                                fieldname: ['equipment_total_cost','man_power_total_cost', 'material_total_cost']
                            },
                            callback: function (response) {
                                if (response.message) {
                                    console.log(`Monthly Plan: ${monthlyPlan.name}`);
                                    console.log(`equipment Total Cost: ${response.message.equipment_total_cost}`);
                                    console.log(`Man Power Total Cost: ${response.message.man_power_total_cost}`);
                                    console.log(`Material Total Cost: ${response.message.material_total_cost}`);
                                    // Add your logic for adding child records here
                                } else {
                                    console.log(`Unable to fetch costs for Monthly Plan: ${monthlyPlan.name}`);
                                }

                                if (i === monthlyPlans.length - 1) {
                                    // This is the last iteration, refresh the field
                                    refresh_field('cashflow_table');
                                }
                            }
                        });
                    })(monthlyPlans[i]);
                }
            } else {
                console.log("No records found in the Monthly Plan for the given Operational Plan.");
            }
        }
    });
}
