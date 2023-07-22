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

