frappe.ui.form.on('Equipment Daily Time Utilization Report', {
    start_date: fetchAndAssign,
    project: fetchAndAssign,
    end_date: fetchAndAssign,
    shift: fetchAndAssign,
    plate_no: fetchAndAssign
});

function fetchAndAssign(frm) {
    if (frm) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Equipment Daily Time Utilization Register',
                filters: {
                    'gc_date': ['between', [frm.doc.start_date, frm.doc.end_date]],
                    'project': frm.doc.project,
                    'shift': frm.doc.shift
                },
                'name': ['!=', frm.docname],
            },
            callback: function (response) {
                if (response.message && Array.isArray(response.message)) {
                    var records = response.message;
                    console.log(`the length of records is ${records.length}`);
                    for (var i = 0; i < records.length; i++) {
                        var record = records[i];
                        console.log(`Document name ${record.name}`);
                        fetchAndLogAllFields(record.name, frm); // Pass the name of the record
                    }
                }
            }
        });
    }
}

function fetchAndLogAllFields(utilizationRegisterName, frm) {
    frm.clear_table('utilization_report_table');

    frappe.call({
        method: 'frappe.client.get',
        args: {
            doctype: 'Equipment Daily Time Utilization Register',
            name: utilizationRegisterName
        },
        callback: function (response) {
            if (response.message) {
                var utilizationRegister = response.message;
                console.log(`the report for this document is ${utilizationRegister.name}`);
                
                // Filter rows based on plate_no
                var filteredRows = utilizationRegister.utilization_register_table.filter(row => !frm.doc.plate_no || row.plate_no == frm.doc.plate_no);
                
                for (var i = 0; i < filteredRows.length; i++) {
                    var source_row = filteredRows[i];
                    var target_row = frappe.model.add_child(frm.doc, 'utilization_report_table');
                    // Assign fields
                    target_row.plate_no = source_row.plate_no;
                    // ... assign other fields
                    
                    console.log(`the target row plate and source row plate ${target_row.plate_no}...${source_row.plate_no}`);
                    console.log("....this is the end of table fields");
                }

                // Refresh the field to reflect changes
                refresh_field('utilization_report_table');
            }
        }
    });
}
