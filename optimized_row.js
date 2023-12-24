
frappe.ui.form.on('Own Equipment Cost Table', {
    data1: updateTotals,
    data2: updateTotals,
    data3: updateTotals,
    data4: updateTotals,
    data5: updateTotals,
    data6: updateTotals,
});
function updateTotals(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    rowTotal(frm, child, "own_equipment_running_cost", "6");
    rowsTotal(frm, "own_equipment_running_cost", "equipment_cost");
}

function rowTotal(frm,child,field,dataLength){
var row_total=0;
for(var i=1;i<=dataLength;i++){
   row_total+=(child[`data${i}`]||0)
}
child.row_total=row_total
frm.refresh_field(field)
}
function rowsTotal(frm,table,field){
    var rows_total=0;
    $.each(frm.doc[table], function(i, row) {
         rows_total+=row.row_total
    });
    frm.set_value(field,rows_total)
    frm.refresh_field(field)
}
