##### errors
## Set Administrator password: 
## Re-enter Administrator password: 
## Updating Dashboard for frappe
## mySite17.test: SystemSettings.enable_scheduler is UNSET
## *** Scheduler is disabled ***
### solution
bench --site mySite17.test set-config enable_scheduler 1
e


##### errors
Traceback (most recent call last):
  File "/home/samuael/.local/bin/bench", line 5, in <module>
    from bench.cli import cli
ModuleNotFoundError: No module named 'bench'
##### solution
sudo pip3 install frappe-bench --upgrade
##### Link 
https://discuss.frappe.io/t/i-have-switched-verison-13-to-verison-14-but-i-am-getting-errror-please-help-how-can-i-resolve-this/93857
