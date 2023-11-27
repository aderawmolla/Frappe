//complain_detail...table field in parent field
//name1.....field in the current table we want to set
//group_main....field in doctype Maintaince case Linked by name1 field
//please be takecare name1 Link field and group_main in another doctype not in this child table
frappe.ui.form.on('Maintenance Work order', {
    group: function(frm, cdt, cdn) {
        console.log("group here is ",frm.doc.group)
        frm.fields_dict['complain_detail'].grid.get_field('name1').get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    group_main:frm.doc.group
                }
            };
        };
        frm.refresh_field("group");
        frm.refresh_field("complain_detail")
        frm.fields_dict['complain_detail'].grid.refresh();
        // Refresh the 'group' field
    }
});
