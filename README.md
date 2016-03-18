# Cloud Marks

A one-user web app to save bookmarks. Using Node, Express, MongoDB and Semantic UI.

User details set as environment properties (EMAIL, PASSWORD)


## Mobile screenshots

![](http://i.imgur.com/q7XVFQbl.png)

![](http://i.imgur.com/L2nqVDrl.png)


## Bookmarklet

Use this in Chrome to save a bookmark, replacing YOUR-SERVERNAME as appropriate:

    javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open("http://<YOUR-SERVERNAME>/bookmark?url="+c(b.location)+"&title="+c(b.title)+"&p=1","bkmk_popup","left="+((a.screenX||a.screenLeft)+10)+",top="+((a.screenY||a.screenTop)+10)+",height=480px,width=550px,resizable=1,alwaysRaised=1");a.setTimeout(function(){d.focus()},300)})();
