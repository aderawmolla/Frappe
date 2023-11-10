  frm.doc.technical_result = [];
                var cards = response.message;
                console.log("the response message", cards);
                if (cards) {
                    console.log("cards executed");
                    $.each(cards, function (index, row) {
                        var child = frappe.model.add_child(frm.doc, "technical_result");
                        child.criteria = row.criteria;
                        child.max_score = row.max_score;
                    });
                    refresh_field("technical_result");
                    var maxScore = 0;
                    try {
                        $.each(frm.doc.technical_result, function (i, row) {
                            maxScore += parseFloat(row.max_score);
                            frm.set_value("max_percentage", maxScore);
                            refresh_field("max_percentage");
                        });
                        console.log("max score obtained", maxScore);
                    } catch (error) {
                        console.log("error detected", error);
                    }
                }
