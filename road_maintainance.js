//Two Days Count...
//Night Time Count
//Seasonal Count


frappe.ui.form.on("Traffic Count Result", {
    onload: function (frm, cdt, cdn) {
        console.log("start function");
        calculateStaffs(frm, cdt, cdn,"day");
        calculateStaffs(frm, cdt, cdn,"night");
        calculateStaffs(frm, cdt, cdn, "two");
        calculateStaffs(frm, cdt, cdn, "seasonal");
        frm.refresh_field("traffic_count_result_table");
        frm.refresh_field("night_time_count");
        frm.refresh_field("two_days_count");
        frm.refresh_field("seasonal_count");
    }
});
frappe.ui.form.on("Traffic Count Result Table", {
    car: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    s_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    l_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    struck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
    mtruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
    htruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    ttrailor: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
});
frappe.ui.form.on("Two Days Count", {
    car: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    s_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    l_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    struck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
    mtruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
    htruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    ttrailor: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
});
frappe.ui.form.on("Night Time Count", {
    car: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    s_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    l_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    struck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
    mtruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
    htruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
    },
    ttrailor: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
});
frappe.ui.form.on("Seasonal Count", {


});
function calculateRowTotal(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var total = child.car + child.lover + child.s_bus + child.l_bus + child.struck + child.mtruck + child.htruck + child.ttrailor;
    frappe.model.set_value(cdt, cdn, "total", total);
    frm.refresh_field("traffic_count_result_table");
    frm.refresh_field("night_time_count");
    frm.refresh_field("two_days_count");
    frm.refresh_field("seasonal_count");
    //   calculateAvarages(frm,cdt,cdn);
}
function calculateAvarages(frm, cdt, cdn) {

    var total_qt = 0;
    $.each(
        tableDocs, function (index, row) {
            total_cost_ac += row.total_act1;
            total_qt += row.total_qt1;
        });
    frm.set_value("total_cost", total_cost_ac);
    frm.set_value("total_qt", total_qt);
    frm.refresh();

}

function calculateStaffs(frm, cdt, cdn, whichStaff) {
    console.log("come on")
    var carTotal = 0;
    var LRoverTotal = 0;
    var SBusTotal = 0;
    var LBusTotal = 0;
    var STruckTotal = 0;
    var MTruckTotal = 0;
    var HTruckTotal = 0;
    var TTrailorTotal = 0;
    var TotalTotal = 0;
    var table;
    var table_field;
    var len;
    if (whichStaff == "day") {
       console.log("excute day function",frm.doc.traffic_count_result_table)
        table_field="traffic_count_result_table";
        table = frm.doc.traffic_count_result_table;
        len = 3;
    }
    else if (whichStaff == "night") {
table_field="night_time_count";
        table = frm.doc.night_time_count;
        len = 1;

    }
    else if (whichStaff == "two") {
        table_field="two_days_count";
        table = frm.doc.two_days_count;
        len = 1;

    }
    else {
   table_field="seasonal_count";
        table = frm.doc.seasonal_count;
        i = 5;
    }
    console.log("does this excuted")
    var tableDocs = frm.doc[table];
    var length =
        table.length;
    console.log("the length is", length)
    if (whichStaff != "seasonal") {
        $.each(table, function (i, d) {
            carTotal += d.car;
            LRoverTotal += d.lover;
            SBusTotal += d.s_bus;
            LBusTotal += d.l_bus;
            STruckTotal = d.struck;
            MTruckTotal = d.mtruck;
            HTruckTotal = d.htruck;
            TTrailorTotal = d.ttrailor;
            TotalTotal = d.total;
        });


    }


    for (i = 0; i <= len; i++) {
        var child = frm.add_child(`${table_field}`);
        frm.refresh_field("traffic_count_result_table");
        frm.refresh_field("night_time_count");
        frm.refresh_field("two_days_count");
        frm.refresh_field("seasonal_count");
    }
    //total


    if (whichStaff == "seasonal") {
        tableDocs[length].name = "seasonal 1 ADT (H)";
        tableDocs[length + 1].name = "seasonal 2 ADT(I)";
        tableDocs[length + 2].name = "seasonal 3 ADT(J)";
        tableDocs[length + 3].name = "AVERAGE(L=(H+I+J)/3)";
        tableDocs[length + 4].name = "seasonal correction factor (SF)(K)";
        tableDocs[length + 5].name = "AADT(K*L) OR L";
    }
    else {

        tableDocs[length].date = "Total SUm OF Column A";

        tableDocs[length].car = carTotal;

        tableDocs[length].lover = LRoverTotal;

        tableDocs[length].s_bus = SBusTotal;

        tableDocs[length].l_bus = LBusTotal;

        tableDocs[length].mtruck = MTruckTotal;

        tableDocs[length].htruck = HTruckTotal;

        tableDocs[length].ttrailor = TTrailorTotal;

        tableDocs[length].total = TotalTotal;
        //avarage

        tableDocs[length + 1].date = "Avarage(D=A/7)";

        tableDocs[length + 1].car = carTotal / length;

        tableDocs[length + 1].lover = LRoverTotal / length;

        tableDocs[length + 1].s_bus = SBusTotal / length;

        tableDocs[length + 1].l_bus = LBusTotal / length;

        tableDocs[length + 1].mtruck = MTruckTotal / length;

        tableDocs[length + 1].htruck = HTruckTotal / length;

        tableDocs[length + 1].ttrailor = TTrailorTotal / length;

        tableDocs[length + 1].total = TotalTotal / length;

    }

    //nfc
    if (whichStaff == "day") {

        tableDocs[length + 2].date = "N.F(E=(B+C)/C)";

        tableDocs[length + 2].car = carTotal / length;

        tableDocs[length + 2].lover = LRoverTotal / length;

        tableDocs[length + 2].s_bus = SBusTotal / length;

        tableDocs[length + 2].l_bus = LBusTotal / length;

        tableDocs[length + 2].mtruck = MTruckTotal / length;

        tableDocs[length + 2].htruck = HTruckTotal / length;

        tableDocs[length + 2].ttrailor = TTrailorTotal / length;

        tableDocs[length + 2].total = TotalTotal / length;
        //

        tableDocs[length + 3].date = "A.D.T(E*D)";

        tableDocs[length + 3].car = carTotal / length;

        tableDocs[length + 3].lover = LRoverTotal / length;

        tableDocs[length + 3].s_bus = SBusTotal / length;

        tableDocs[length + 3].l_bus = LBusTotal / length;

        tableDocs[length + 3].mtruck = MTruckTotal / length;

        tableDocs[length + 3].htruck = HTruckTotal / length;

        tableDocs[length + 3].ttrailor = TTrailorTotal / length;

        tableDocs[length + 3].total = TotalTotal / length;
    }

}
