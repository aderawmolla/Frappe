frappe.ui.form.on("Traffic Count Result", {
    onload: function (frm, cdt, cdn) {
        //    var length=frm.doc.traffic_count_result_table.length;
        //    console.log("length of traffic table",length)
        //     frm.doc.traffic_count_result_table[30].date="Total SUm OF Column A";
        //     frm.doc.traffic_count_result_table[31].date="Avarage(D=A/7)";
        //     frm.doc.traffic_count_result_table[32].date="N.f(E=(B+C)/C)";
        //     frm.doc.traffic_count_result_table[33].date="A.D.T(E*D)";
        //     frm.doc.traffic_count_result_table[34].date="";
        //     frm.doc.traffic_count_result_table[35].date="Night Time Count";
        //     frm.doc.traffic_count_result_table[65].date="Total(G)";
        //     frm.doc.traffic_count_result_table[66].date="Avarage";
        //     frm.doc.traffic_count_result_table[67].date="";
        //     frm.doc.traffic_count_result_table[68].date="Two days Count";
        //     frm.doc.traffic_count_result_table[71].date="Total(F)";
        //     frm.doc.traffic_count_result_table[72].date="Avarage";
        //     frm.doc.traffic_count_result_table[73].date="";
        //     frm.doc.traffic_count_result_table[74].date="Seasonal Count";
        //     frm.doc.traffic_count_result_table[75].date="Seasonal 1 ADT(H)";
        //     frm.doc.traffic_count_result_table[76].date="Seasonal 2 ADT(I)";
        //     frm.doc.traffic_count_result_table[77].date="Seasonal 3 ADt(J)";
        //     frm.doc.traffic_count_result_table[78].date="Avarage()";
        //     frm.doc.traffic_count_result_table[79].date="Seasonal Correction Factor";
        //     frm.doc.traffic_count_result_table[80].date="AADT";
        calculateStaffs(frm, cdt, cdn);
        calculateStaffsTwoDays(frm,cdt,cdn);
        frm.refresh_field("traffic_count_result_table");
    }
});
frappe.ui.form.on("Traffic Count Result Table", {
    car: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffs(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffs(frm, cdt, cdn);
    },
    s_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffs(frm, cdt, cdn);
    },
    l_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffs(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffs(frm, cdt, cdn);
    },
    struck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);

    },
    mtruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
       calculateStaffs(frm, cdt, cdn);

    },
    htruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffs(frm, cdt, cdn);
    },
    ttrailor: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffs(frm, cdt, cdn);
    },
});
frappe.ui.form.on("Traffic Count Result Table", {
    car: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffsTwoDays(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffsTwoDays(frm, cdt, cdn);
    },
    s_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffsTwoDays(frm, cdt, cdn);
    },
    l_bus: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffsTwoDays(frm, cdt, cdn);
    },
    lover: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffsTwoDays(frm, cdt, cdn);
    },
    struck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffsTwoDays(frm, cdt, cdn);

    },
    mtruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffsTwoDays(frm, cdt, cdn);

    },
    htruck: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
        calculateStaffs(frm, cdt, cdn);
    },
    ttrailor: function (frm, cdt, cdn) {
        calculateRowTotal(frm, cdt, cdn);
      calculateStaffsTwoDays(frm, cdt, cdn);

     },
});
function calculateRowTotal(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var total = child.car + child.lover + child.s_bus + child.l_bus + child.struck + child.mtruck + child.htruck + child.ttrailor;
    frappe.model.set_value(cdt, cdn, "total", total);
    frm.refresh_field("traffic_count_result_table");
   
    //   calculateAvarages(frm,cdt,cdn);
}
function calculateAvarages(frm, cdt, cdn) {

    var total_qt = 0;
    $.each(frm.doc.traffic_count_result_table, function (index, row) {
        total_cost_ac += row.total_act1;
        total_qt += row.total_qt1;
    });
    frm.set_value("total_cost", total_cost_ac);
    frm.set_value("total_qt", total_qt);
    frm.refresh();

}

function calculateStaffs(frm, cdt, cdn) {
    var length = frm.doc.traffic_count_result_table.length;
    var carTotal = 0;
    var LRoverTotal = 0;
    var SBusTotal = 0;
    var LBusTotal = 0;
    var STruckTotal = 0;
    var MTruckTotal = 0;
    var HTruckTotal = 0;
    var TTrailorTotal = 0;
    var TotalTotal = 0;
    $.each(frm.doc.traffic_count_result_table, function (i, d) {
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
    for (var i = 0; i <= 3; i++) {
        var child = frm.add_child("traffic_count_result_table");
        refresh_field("traffic_count_result_table");
    }
      //total
    frm.doc.traffic_count_result_table[length].date="Total SUm OF Column A";
    frm.doc.traffic_count_result_table[length].car=carTotal;
    frm.doc.traffic_count_result_table[length].lover=LRoverTotal;
    frm.doc.traffic_count_result_table[length].s_bus=SBusTotal;
    frm.doc.traffic_count_result_table[length].l_bus=LBusTotal;
    frm.doc.traffic_count_result_table[length].mtruck=MTruckTotal;
    frm.doc.traffic_count_result_table[length].htruck=HTruckTotal;
    frm.doc.traffic_count_result_table[length].ttrailor=TTrailorTotal;
    frm.doc.traffic_count_result_table[length].total=TotalTotal;
//avarage
    frm.doc.traffic_count_result_table[length+1].date="Avarage(D=A/7)";
    frm.doc.traffic_count_result_table[length+1].car=carTotal/length;
    frm.doc.traffic_count_result_table[length+1].lover=LRoverTotal/length;
    frm.doc.traffic_count_result_table[length+1].s_bus=SBusTotal/length;
    frm.doc.traffic_count_result_table[length+1].l_bus=LBusTotal/length;
    frm.doc.traffic_count_result_table[length+1].mtruck=MTruckTotal/length;
    frm.doc.traffic_count_result_table[length+1].htruck=HTruckTotal/length;
    frm.doc.traffic_count_result_table[length+1].ttrailor=TTrailorTotal/length;
    frm.doc.traffic_count_result_table[length+1].total=TotalTotal/length;


//nfc

    frm.doc.traffic_count_result_table[length+2].date="N.F(E=(B+C)/C)";
    frm.doc.traffic_count_result_table[length+2].car=carTotal/length;
    frm.doc.traffic_count_result_table[length+2].lover=LRoverTotal/length;
    frm.doc.traffic_count_result_table[length+2].s_bus=SBusTotal/length;
    frm.doc.traffic_count_result_table[length+2].l_bus=LBusTotal/length;
    frm.doc.traffic_count_result_table[length+2].mtruck=MTruckTotal/length;
    frm.doc.traffic_count_result_table[length+2].htruck=HTruckTotal/length;
    frm.doc.traffic_count_result_table[length+2].ttrailor=TTrailorTotal/length;
    frm.doc.traffic_count_result_table[length+2].total=TotalTotal/length;
//
   frm.doc.traffic_count_result_table[length+3].date="A.D.T(E*D)";
    frm.doc.traffic_count_result_table[length+3].car=carTotal/length;
    frm.doc.traffic_count_result_table[length+3].lover=LRoverTotal/length;
    frm.doc.traffic_count_result_table[length+3].s_bus=SBusTotal/length;
    frm.doc.traffic_count_result_table[length+3].l_bus=LBusTotal/length;
    frm.doc.traffic_count_result_table[length+3].mtruck=MTruckTotal/length;
    frm.doc.traffic_count_result_table[length+3].htruck=HTruckTotal/length;
    frm.doc.traffic_count_result_table[length+3].ttrailor=TTrailorTotal/length;
    frm.doc.traffic_count_result_table[length+3].total=TotalTotal/length;

}
function calculateStaffsTwoDays(frm, cdt, cdn) {
    var length = frm.doc.traffic_count_result_table.length;
    var carTotal = 0;
    var LRoverTotal = 0;
    var SBusTotal = 0;
    var LBusTotal = 0;
    var STruckTotal = 0;
    var MTruckTotal = 0;
    var HTruckTotal = 0;
    var TTrailorTotal = 0;
    var TotalTotal = 0;
    $.each(frm.doc.traffic_count_result_table, function (i, d) {
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
    for (var i = 0; i <= 1; i++) {
        var child = frm.add_child("traffic_count_result_table");
        refresh_field("traffic_count_result_table");
    }
      //total
    frm.doc.traffic_count_result_table[length].date="Total SUm OF Column A";
    frm.doc.traffic_count_result_table[length].car=carTotal;
    frm.doc.traffic_count_result_table[length].lover=LRoverTotal;
    frm.doc.traffic_count_result_table[length].s_bus=SBusTotal;
    frm.doc.traffic_count_result_table[length].l_bus=LBusTotal;
    frm.doc.traffic_count_result_table[length].mtruck=MTruckTotal;
    frm.doc.traffic_count_result_table[length].htruck=HTruckTotal;
    frm.doc.traffic_count_result_table[length].ttrailor=TTrailorTotal;
    frm.doc.traffic_count_result_table[length].total=TotalTotal;
//avarage
    frm.doc.traffic_count_result_table[length+1].date="Avarage(D=A/7)";
    frm.doc.traffic_count_result_table[length+1].car=carTotal/length;
    frm.doc.traffic_count_result_table[length+1].lover=LRoverTotal/length;
    frm.doc.traffic_count_result_table[length+1].s_bus=SBusTotal/length;
    frm.doc.traffic_count_result_table[length+1].l_bus=LBusTotal/length;
    frm.doc.traffic_count_result_table[length+1].mtruck=MTruckTotal/length;
    frm.doc.traffic_count_result_table[length+1].htruck=HTruckTotal/length;
    frm.doc.traffic_count_result_table[length+1].ttrailor=TTrailorTotal/length;
    frm.doc.traffic_count_result_table[length+1].total=TotalTotal/length;

}
