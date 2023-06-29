
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
