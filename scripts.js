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
