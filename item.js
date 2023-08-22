frappe.ui.form.on('Item', {
    item_category: updateItemCode,
    item_name: updateItemCode,
    item_sub_category: updateItemCode
});
function updateItemCode(frm) {
    if (frm.doc.item_category && frm.doc.item_sub_category && frm.doc.item_name) {
        frappe.model.with_doc("Item Category", frm.doc.item_category, function() {
            var category = frappe.model.get_doc("Item Category", frm.doc.item_category);
            var categoryPrefix = category.category_code.substring(0, 2);
            frappe.model.with_doc("Item Sub Category", frm.doc.item_sub_category, function() {
                var subCategory = frappe.model.get_doc("Item Sub Category", frm.doc.item_sub_category);
                var subCategoryPrefix = subCategory.sub_category_code.substring(0, 2);
                console.log(`sub category prefix is ${subCategoryPrefix}`)
                var name_prefix = frm.doc.item_name.substring(0, 1).toUpperCase();

                // Query the database to fetch all item_code_counter values
                frappe.call({
                    method: "frappe.client.get_list",
                    args: {
                        doctype: "Item",
                        filters: {
                            item_sub_category: frm.doc.item_sub_category
                        },
                        fields: ["item_code"],
                        order_by: "item_code desc",
                        
                    },
                    callback: function(response) {
                        var maxCounter = 0;
                    
                        if (response.message && Array.isArray(response.message)) {
                            var records = response.message;
                    
                            if (records.length == 0) {
                                console.log("records are 0");
                                frm.clear_table('utilization_report_table');
                                refresh_field('utilization_report_table');
                            } else {
                                console.log(`the length of records is ${records.length}`);
                                for (var i = 0; i < records.length; i++) {
                                    var itemCode = response.message[i].item_code;
                                    var lastDigits = itemCode.slice(-4);
                                    var counter = parseInt(lastDigits);
                    
                                    if (!isNaN(counter)) {
                                        if (counter >= maxCounter) {
                                            maxCounter = counter;
                                        }
                                    }
                                }
                            }
                        } else {
                            // Handle the case when response.message is not an array
                        }

                        console.log(`maximum counter is ${maxCounter}`);
                    
                        var itemCode = categoryPrefix + subCategoryPrefix + "-" + name_prefix + ("0000" + (maxCounter + 1)).slice(-4);
                    
                        frm.set_value("item_code", itemCode);
                        console.log(`the maximum added counter is ${maxCounter + 1}`);
                        frm.set_value("item_code_counter", maxCounter + 1);
                    }
                    
                });
            });
        });
    }
}


frappe.ui.form.on("Item", {
    item_category: function(frm, cdt, cdn) {
     
     var d = locals[cdt][cdn];

     frm.set_query("item_sub_category", function() {
        return {
            "filters": {
                "item_category": frm.doc.item_category
            }
        }
     });
   },

   item_sub_category: function(frm) {
    cur_frm.add_fetch('item_sub_category', 'item_category', 'item_category');
    updateItemCode(frm);
   }
});

frappe.ui.form.on("Item", {
    
    item_sub_category:function(frm, cdt, cdn) {
        cur_frm.add_fetch('item_sub_category', 'item_category', 'item_category');
        refresh_field('item_category')
    }
});
  
