//1.project link of source doc,2nd argument source to be assigned,target to be assigned
cur_frm.add_fetch('project', 'consultant', 'consultant');
//2.calling backend and fetch data
host/api/meathod/frappe/client/get_value
frappe.call({
                method: 'frappe.client.get_value',//get and get_lists with fields and fildname are alternatives
                args: {
                    doctype: 'Fuel Request for Equipment Form',
                     //doctype can be table 
                    filters: { 'plate_no': frm.doc.plate_no, 'name': ['!=', frm.docname] },
                   //'name': ['!=', frm.docname] excludes the current document
                   fieldname: ['current_km_reading', 'date', 'current_fuel_issue'],//you can use [*],ignore if specified it only fetches the document name
                  limit_page_length: 1000 // Set a large number to fetch more records
                },
                callback: function (response) {
                    if (response.message) {   
                    }
            }
    });
//3.assigning linked table field when another field of current table changed
frappe.ui.form.on('Tyre Control Table', {
  //when equip_code of Tyre Control Table changes it fetches data from the database and assign to equp_type of table document rows
    equip_code: function(frm, cdt, cdn) {
        var child = locals[cdt][cdn];
        // Fetch information from the linked doctype using a server call
        frappe.call({
            method: "frappe.client.get_value",
             args: {
                doctype: 'Equipment Birth Certificate Form',
                filters: { plate_no: child.equip_code},
                fieldname: ['equipment_type']
            },
            callback: function(response) {
                if (response.message) {

                // Update the "equipment_type" field in the current child table row
                    frappe.model.set_value(cdt, cdn, "equip_type", response.message.equipment_type);
                 //  frappe.model.set_value(d.doctype, d.name, 'ot_total_in_birr', (d.ot_normal_amount + d.ot_knight_

                }
            }
        });
    }});
//4.fetching data from current doctype table to another table of current doctype
 frappe.ui.form.on('Sales Invoice', {
    validate: function(frm) {
        // calculate incentives for each person on the deal
        total_incentive = 0
//sales_team is linked field to another table
        $.each(frm.doc.sales_team, function(i, d) {
            // calculate incentive
            var incentive_percent = 2;
            if(frm.doc.base_grand_total > 400) incentive_percent = 4;
            // actual incentive
            //flt means float in this case
            d.incentives = flt(frm.doc.base_grand_total) * incentive_percent / 100;
            total_incentive += flt(d.incentives)
        });
        frm.doc.total_incentive = total_incentive;
    } 
})
//5.fetching from one table from another document and assign to current document
frappe.call({
    method:  "erpnext.manpower_populate_api.get_manpower_by_task",
     args: {parent: taskParent}
    }).done((r) => {
    $.each(r.message, function(_i, e){
     var entry = frm.add_child("manpower1");
    //alternative to this
    // var entry = frm.add_child("Table doctype","table field");
    //another alternative
    //var tableRow = frappe.model.add_child(frm.doc, "GRAND SUMMARY SHEET OF PAYMENT", "grand_summary_sheet_of_payment")
     entry.id_map = e.id_map;
     entry.job_title = e.job_title;

    })   })
//6.fetching data from another then assign in link doctype by filtering it.

//7.auto fill parent field when another parent field selected

//8.assign table fields when field of parent field selected

//9.assign table fields when another table field selcted

//10.assign parent field when child field selected

//11.filtering table field by parent field 

//12.filtering parent field from table field

//13.filtering parent field from parent field
frappe.ui.form.on("Item", {
//when item_category selected(linked field ) it assigns the item_sub_category when the item_sub_category item_category is matched
    item_category: function(frm, cdt, cdn) {
     frm.set_query("item_sub_category", function() {
        return {
            "filters": {
                "item_category": frm.doc.item_category
            }
        }
     });
   },
});
frappe.ui.form.on("User Card",{
    onload: function (frm, cdt, cdn) {
         frm.set_value("item_group","Fixed Asset");
        console.log("field refreshed");
         refresh_field("item_group");
        console.log(frm.doc.item_group)
            frm.set_query("item","user_card_item", function (frm, cdt, cdn) {
                return {
                    "filters": {
                        "item_group":"Fixed Asset"
                    }
                }
            });
      


    }
});
//14.take the current user
frappe.ui.form.on('Tyre Control Card', {
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
     frm.set_value('encoded_by', user.full_name);
    }
   }
  });
 }
});
//15.document states
//16.creating basic report 
//adding filters
//alternative apis
//common apis
//do some actions when row is added or refreshed
frm.fields_dict["utilization_register_table"].grid.on_row_refresh =
      function (doc, cdt, cdn) {
        var child = locals[cdt][cdn];
        setWorkedHours(child);
      };
//utility apis
frm.set_df_property('myfield', 'read_only', frm.doc.__islocal ? 0 : 1); // use the __islocal value of doc, to check if the doc is saved or not
var table = frm.doc.payment_table;//initialize table field
frappe.throw(`Invalid  12 hour format on "second half end" : ${child.second_half_end}` ); //throw error message
frappe.msgprint('Custom action performed when canceling Purchase Order.'); //printing messagees
frm.refresh();//refresh the whole document
frm.refresh_field("planned"); //refresh table field with frm
refresh_field("planned");//you can refresh for parent field for non-table fields
frm.clear_table("grand_summary_sheet_of_payment");
frm.set_value("table_34", []);//assigning table as empty

//looping over table field
//adding eval
"depends_on": "eval:doc.purpose == 'Material Transfer'",
  eval:doc.delivered_by_supplier==1||doc.supplier

    





















 
