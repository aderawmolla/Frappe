			frappe.call({
				method: 'frappe.client.get_list',
				args: {
					doctype: 'New Daily Plan',
					filters: filters,
				},
				callback: async function(response) {
					console.log("response", response);

					if (response.message && Array.isArray(response.message)) {
						var records = response.message;

						// Create a function that captures the correct index
						function fetchRecord(index) {
							if (index >= records.length) {
								console.log("all the data", allDatas);
								// Process data and populate table
								if (frm.doc.report_type === "Material Report") {
									processMaterialReportTable(frm, allDatas, "material_detail_summerized");
								}
								else if (frm.doc.report_type === "Manpower Report") {
									processMaterialReportTable(frm, allDatas, "manpower_detail_summerized");
								}
								else if (frm.doc.report_type === "Machinery/Equipment Report") {
									processMaterialReportTable(frm, allDatas, "machinery_detail_summerized");
								}
								return;
							}

							var record = records[index];
							frappe.call({
								method: 'frappe.client.get',
								args: {
									doctype: 'New Daily Plan',
									name: record.name
								},
								callback: function(recordResponse) {
									if (recordResponse.message) {
										var fetchedRecord = recordResponse.message;
										console.log("Fetched Record:", fetchedRecord);
										allDatas[index] = fetchedRecord;
									}
									// Fetch the next record
									fetchRecord(index + 1);
								}
							});
						}

						// Start fetching records from index 0
						fetchRecord(0);
					}
				}
			});
