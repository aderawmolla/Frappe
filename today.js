
frappe.ui.form.on("Utilization Register Table", {
  plate_no: function (frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    // Fetch information from the linked doctype using a server call
    frappe.call({
      method: "frappe.client.get_value",
      args: {
        doctype: "Equipment Birth Certificate Form",
        filters: { plate_no: child.plate_no },
        fieldname: ["equipment_type"],
      },
      callback: function (response) {
        if (response.message) {
          // Update the "equipment_type" field in the current child table row
          frappe.model.set_value(
            cdt,
            cdn,
            "equipz_code",
            response.message.equipment_type
          );
        }
      },
    })
  }});
