admin

show/edit softdeleted
show/edit archived
crud domain, idea, user, video, videostatus, channel

dashboard

long and short videos

in actions, check if action allowed - locals.actionAllowed = true other wise return error - action not allowed

clone/copy/duplicate videos

long
short
idea
domain
videostatus
channel
user

choose channel drop down top right corner -> on channel select, refresh current tab data
menu top left corner
top right Welcome {username}
top right Clock

view edit delete archive(admin) permanent(admin) delete view history clone(cloned showed appear just below)
no softdelete for domain and videostatus

delete view history(admin)

view history(idea and long and short) datatables -> only 2 compare -> no edit. delete button for admin only -> jsdiff

all datatables
create new
soft delete all(admin)
delete all permanently(admin)
archive all(admin)
view softdeleted(admin)
view archived(admin)
archive selected
soft delete selected
delete selected permanently

loading page/icon while data is being loaded

pinned/fav video - always on top of the list -> sort by pin + latest

*all data retrieval channelid wise -> load params

npm run format
npm run lint

*logout -> confirm dialog

*instead of load function in page.server.js, use server.js GET function -> take channelId as input -> use fetch onmount and use fetch on formsubmit to refresh list

show loading uindicator when list is loading

dont load by default. select dchannel then load. keep channel default selected when visiting other pages.
cvhannel option aftyer youtube management system

filter videos and everything by channel once channel select is done

auth in all actions

user - email cannot be changed



view button -> click not working everytime -> check if addeditview commponent works with every click and id can be sent to it as prop

*show message success and close dialog on save after 2 seconds

refresh list automatically and also give refresh button next to it

*video version history should get saved

select current channelid by default and show it's videos

*request being sent on cancel button in add new dialog

reset password link via notification -> user able to update password

notification collection -> you created {title of video}, you updated {title of video} -> show notifications latest first. when dismiss notification, update seen attribute. Dont show seen notifications again. View all notifications.

*if error, keep dialog open and show error

refresh datatable on save


*if error, remove in few seconds