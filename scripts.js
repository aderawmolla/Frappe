//script 1
//this script assigns value in ERP next before saving to document
frappe.ui.form.on('testUser', {
  before_save: function(frm) {
    // Get the field values
    var firstName = frm.doc.first_name;
    var lastName = frm.doc.last_name;
    var initial_point=frm.doc.initial_point;
     var final_point=frm.doc.final_point; 
    var difference=final_point-initial_point;
    // Calculate the full name
    var fullName = firstName + ' ' + lastName;
     frm.doc.difference=difference;
    // Set the full name field value
    frm.doc.full_name = fullName;
  }
});
//


//script 2
//script to update child doctype properties
frappe.ui.form.on('Log Book Summary', {
    refresh: function(frm) {
        frm.fields_dict['table_5'].grid.on_row_add = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            setDifference(child);
        };
       frm.fields_dict['table_5'].grid.on_row_add = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            setDifferenceAgain(child);
        };
        frm.fields_dict['table_5'].grid.on_row_refresh = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            setDifference(child);
        };
        frm.fields_dict['table_5'].grid.on_row_refresh = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            setDifferenceAgain(child);
        };
    }
});

frappe.ui.form.on('Log book Summary child', {
    month_last: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setDifference(child);
    },
    month_start: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setDifference(child);
    },
   should_use: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setDifferenceAgain(child);
    },
    monthly_fill: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setDifferenceAgain(child);
    }
});

function setDifference(child) {
    var difference = child.month_last - child.month_start;
    frappe.model.set_value(child.doctype, child.name, 'month_difference', difference);
}
function setDifferenceAgain(child) {
    var difference = child.monthly_fill - child.should_use;
    frappe.model.set_value(child.doctype, child.name, 'difference', difference);
}

////script 3


frappe.ui.form.on('Equipment Daily Time Utilization Register', {
    refresh: function(frm) {
        frm.fields_dict['utilization_register_table'].grid.on_row_add = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            setWorkedHours(child);
        };
       frm.fields_dict['utilization_register_table'].grid.on_row_add = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            setDifferenceOfKm(child);
        };
        frm.fields_dict['utilization_register_table'].grid.on_row_refresh = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            setWorkedHours(child);
        };
        frm.fields_dict['utilization_register_table'].grid.on_row_refresh = function(doc, cdt, cdn) {
            var child = locals[cdt][cdn];
            setDifferenceOfKm(child);
        };
    }
});

frappe.ui.form.on('Utilization Register Table', {
    first_half_start:function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setWorkedHours(child);
    },
    first_half_end: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setWorkedHours(child);
    },
   second_half_start: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setWorkedHours(child);
    },
    second_half_end: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setWorkedHours(child);
    },
   initial:function(frm,cdt,cdn){
    var child = locals[cdt][cdn];
   setDifferenceOfKm(child);

   },
   final:function(frm,cdt,cdn){
   var child = locals[cdt][cdn];
   setDifferenceOfKm(child);
   }


});

function setWorkedHours(child) {
    var first_half = child.first_half_end - child.first_half_start;
    var  second_half=child.second_half_end-child.second_half_start;
 var worked_hours=first_half+second_half;
    frappe.model.set_value(child.doctype, child.name, 'worked_hrs', worked_hours);
}
function setDifferenceOfKm(child) {
    var difference = child.final - child.initial;
    frappe.model.set_value(child.doctype, child.name, 'diff', difference);
}
//script to get session user
frappe.ui.form.on('Equipment Daily Time Utilization Register', {
 onload: function(frm) {
  frappe.call({
   method: 'frappe.client.get_value',
   args: {
    doctype: 'User',
    filters: { name: frappe.session.user },
    fieldname: ['full_name']
   },
   callback: function(response) {
    var user = response.message;
    if (user) {
     frm.set_value('prepared_by', user.full_name);
    }
   }
  });
 }
});
//testing auto fill name from employee
frappe.ui.form.on('Daily Utilization Register', {
    onload: function(frm) {
        // Fetch the Employee document
        if (frm.doc.approved_by) {
            frappe.db.get_value('Employee', frm.doc.approved_by, 'employee_name', function(data) {
                // Set the employee name as the value of the approved_by field
                frm.set_value('approved_by', data.employee_name);
            });
        }
    }
});
//down reason
PM-Preventive  Maintainance
WP-Waiting For Pats
WM-Waiting for  MaaanPower
UR-Under Repair

//idle reason
FL-Fuel/Lubricant Shortage
AD-Activity Dependent
OP-Operator Problem
MO-Mobalization//Demobalization
WD-Waiting for Demobalization
FM-Force Majeure
ED-Equipment Dependent
WS-Water Shortage
LC-Lack of Coordination
MF-Miscellaneous Factor
WC-Weather Condition
//script to update the value of child doctype fields
frappe.ui.form.on('Utilization Register Table', {
    first_half_operator: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        if (child.first_half_operator) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'Employee',
                    filters: {
                        name: child.first_half_operator
                    },
                    fieldname: 'employee_name'
                },
                callback: function(response) {
                    if (response.message && response.message.employee_name) {
                        console.log('Fetched Employee Name:', response.message.employee_name);
                        frappe.model.set_value(cdt, cdn, 'first_half_name', response.message.employee_name);
                    } else {
                        console.log('No Employee Name found for:', child.first_half_operator);
                    }
                }
            });
        }
    },
    second_half_operator: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        if (child.second_half_operator) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'Employee',
                    filters: {
                        name: child.second_half_operator
                    },
                    fieldname: 'employee_name'
                },
                callback: function(response) {
                    if (response.message && response.message.employee_name) {
                        console.log('Fetched Employee Name:', response.message.employee_name);
                        frappe.model.set_value(cdt, cdn, 'second_half_name', response.message.employee_name);
                    } else {
                        console.log('No Employee Name found for:', child.second_half_operator);
                    }
                }
            });
        }
    }
});
////use this code
frappe.ui.form.on('HeavyandLightVehiclesTable', {
    service_hrs_counter_a: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setDifference(child);
    },
    recommended_pm_km_b: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setDifference(child);
    }, 
    next_service_counter_kms_c: function(frm, cdt, cdn) {
        // No need to do anything here since this field is being updated by setDifference function
    },
    service_schedule_balance_d: function(frm, cdt, cdn) {
        // No need to do anything here since this field is being updated by setDifference function
    },
    equipment_km_reading_e: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        setDifference(child);
    },
});

function setDifference(child) {
    var sum = child.service_hrs_counter_a + child.recommended_pm_km_b;
    var difference = sum - child.equipment_km_reading_e; // Pass 'child.equipment_km_reading_e' instead of 'equipment_km_reading_e'

    frappe.model.with_doc(child.doctype, child.name, function() {
        frappe.model.set_value(child.doctype, child.name, 'next_service_counter_kms_c', sum);
        frappe.model.set_value(child.doctype, child.name, 'service_schedule_balance_d', difference);
        
        // Call checkStatus after updating the fields to set the 'remark' field
        checkStatus(child);
    });
}

function checkStatus(child){
    if (child.service_schedule_balance_d < 1000) {
        frappe.model.set_value(child.doctype, child.name, 'remark', "WAITING PM");
    } else {
        frappe.model.set_value(child.doctype, child.name, 'remark', " "); 
    }
}
////purchase order client

frappe.ui.form.on('Purchase Order', {

    pr_no: function(frm) {
     if (frm.doc.pr_no) {
        cur_frm.add_fetch('pr_no', 'purchase_for', 'purchase_for');
        cur_frm.add_fetch('pr_no', 'receiving_project', 'receiving_project');
        cur_frm.add_fetch('pr_no', 'date', 'schedule_date');
        frm.refresh_field('purchase_for');
        frm.refresh_field('receiving_project');
        frm.refresh_field('schedule_date');
      frm.clear_table('items');
      console.log("Test 1");
      frappe.model.with_doc('PR', frm.doc.pr_no, function() {
   
       let source_doc = frappe.model.get_doc('PR', frm.doc.pr_no);
       console.log("source doc", source_doc)
   
       $.each(source_doc.purchase_requisition_item, function(index, source_row) {
   
        console.log("Test 3");
       
                   const target_row = frm.add_child('items');
                    target_row.item_code = source_row.item_code;
                    target_row.item_category = source_row.item_sub_category;
                    target_row.description = source_row.description;
                    target_row.uom = source_row.uom;
                    target_row.qty = source_row.qty;
   
       });
   
       frm.refresh_field('items');
      });
     }
    },
   });



//a script filtering by date

frappe.ui.form.on('Equipment Daily Time Utilization Report', {
    start_date: function(frm) {
        fetchAndAssign(frm);
    },
    project: function(frm) {
        fetchAndAssign(frm);
    }
});

function fetchAndAssign(frm) {
    if (frm.doc.start_date || frm.doc.project) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Equipment Daily Time Utilization Register',
                filters: {
                    'gc_date': frm.doc.start_date,
                    'name': ['!=', frm.docname],
                    'project': frm.doc.project
                }
            },
            callback: function(response) {
                if (response.message && Array.isArray(response.message)) {
                    var records = response.message;
                    console.log(`the length of records is ${records.length}`);
                    for (var i = 0; i < records.length; i++) {
                        var record = records[i];
                        console.log(`Document name  ${record.name}`);
                        // Fetch and log all fields from the referenced Utilization Register
                        fetchAndLogAllFields(record.name, frm); // Pass the name of the record
                    }
                }
            }
        });
    }
}

function fetchAndLogAllFields(utilizationRegisterName, frm) {
    frappe.call({
        method: 'frappe.client.get',
        args: {
            doctype: 'Equipment Daily Time Utilization Register',
            name: utilizationRegisterName
        },
        callback: function(response) {
            if (response.message) {
                var utilizationRegister = response.message;
                console.log(`the report for this document is ${utilizationRegister.name}`);
                for (var field in utilizationRegister) {
                    if (utilizationRegister.hasOwnProperty(field)) {
                        if (field === 'utilization_register_table' && Array.isArray(utilizationRegister[field])) {
                            console.log(`..............list of tables for ${utilizationRegister.name} .................`);
                                 frm.clear_table('utilization_report_table');

                            for (var i = 0; i < utilizationRegister[field].length; i++) {
                                var source_row = utilizationRegister[field][i];
                                // Assuming you have access to the utilization_register_report data
                                // You can add rows to the utilization_report_table
                                var target_row = frappe.model.add_child(frm.doc, 'utilization_register_table', 'utilization_report_table');
                                target_row.plate_no = source_row.plate_no;
                                target_row.first_half_start = source_row.first_half_start;
                                console.log(`the target row plate and source row plate ${target_row.plate_no}...${source_row.plate_no}`);
                                console.log("....this is the end of table fields");
                                // ... other fields
                            }
                            refresh_field('utilization_report_table'); // Refresh the field to reflect changes
                        } else {
                            // ... other fields
                            console.log(`${field}: ${utilizationRegister[field]}`);
                        }
                    }
                }
            }
        }
    });
}


