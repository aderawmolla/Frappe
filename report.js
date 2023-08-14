
frappe.ui.form.on('Equipment Daily Time Utilization Report', {
    start_date:fetchAndAssign,
    project:fetchAndAssign,
    end_date:fetchAndAssign,
    shift:fetchAndAssign,
    plate_no:fetchAndAssign,
    equipment_type:fetchAndAssign
});

function fetchAndAssign(frm) {
    if (frm) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Equipment Daily Time Utilization Register',
                filters: {
                'gc_date': frm.doc.start_date && frm.doc.end_date
                ? ['between', [frm.doc.start_date, frm.doc.end_date]]
                : frm.doc.start_date
                    ? ['>=', frm.doc.start_date]
                    : frm.doc.end_date
                        ? ['<=', frm.doc.end_date]
                        : undefined,
                'project': frm.doc.project ? frm.doc.project:undefined,
                'shift': frm.doc.shift,
                'equipment_type':frm.doc.equipment_type=="all"?undefined:frm.doc.equipment_type
                },
                'name': ['!=', frm.docname],
            },
            callback: function (response) {
                if (response.message && Array.isArray(response.message)) {
                    var records = response.message;
                 if(records.length==0){
                 console.log("records are 0")
                   frm.clear_table('utilization_report_table');               
                     refresh_field('utilization_report_table');

                    }
                    else{
                     console.log(`the length of records is ${records.length}`);
                    for (var i = 0; i < records.length; i++) {
                        var record = records[i];
                        console.log(`Document name ${record.name}`);
                        fetchAndLogAllFields(record.name, frm); // Pass the name of the record
                    }}
                    
                }
            }
        });
    }
}

function fetchAndLogAllFields(utilizationRegisterName, frm){
    frm.clear_table('utilization_report_table'); // Clear the table if no records are found
    frappe.call({
        method: 'frappe.client.get',
        args: {
            doctype: 'Equipment Daily Time Utilization Register',
            name: utilizationRegisterName
        },
        callback: function (response) {
            if (response.message) {
                var utilizationRegister = response.message;

                // Filter rows based on plate_no
                var filteredRows = frm.doc.plate_no
                    ? utilizationRegister.utilization_register_table.filter(row => row.plate_no === frm.doc.plate_no)
                    : utilizationRegister.utilization_register_table;
               
                    for (var i = 0; i < filteredRows.length; i++) {
                        var source_row = filteredRows[i];
                        var target_row = frappe.model.add_child(frm.doc, 'utilization_report_table');
                        // Assign other fields
                        target_row.plate_no = source_row.plate_no;
                        target_row.equipment_type = source_row.equipment_type;
                        target_row.first_half_start = source_row.first_half_start;
                        target_row.first_half_end = source_row.first_half_end;
                        target_row.second_half_start = source_row.second_half_start;
                        target_row.second_half_end = source_row.second_half_end;
                        target_row.worked_hrs = source_row.worked_hrs;
                        target_row.idle_hrs = source_row.idle_hrs;
                        target_row.down_hrs = source_row.down_hrs;
                        target_row.first_half_name = source_row.first_half_name;
                        target_row.second_half_name = source_row.second_half_name;
                        target_row.down_hrs = source_row.down_hrs;
                        // ... (other assignments)
                        console.log(`the target row plate and source row plate ${target_row.plate_no}...${source_row.plate_no}`);
                        console.log("....this is the end of table fields");
                    }

                    // Refresh the field to reflect changes
                    refresh_field('utilization_report_table');
               
            }
        }
    });
}



