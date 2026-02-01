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

view edit  delete  archive(admin)  permanent(admin) delete  view history  clone(cloned showed appear just below)
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

all data retrieval channelid wise -> load params

npm run format
npm run lint

logout -> confirm dialog



instead of load function in page.server.js, use server.js GET function -> take channelId as input -> use fetch onmount and use fetch on formsubmit to refresh list

shoe loading uindicator when list is loading



dont load by default. select dchannel then load. keep channel default selected when visiting other pages.
cvhannel option aftyer youtube management system