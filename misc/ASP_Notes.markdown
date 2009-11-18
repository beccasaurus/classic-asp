* Request.QueryString
* Request.Form
* Request.Cookies
* Response.Cookies("firstname")="Alex"
* Session("foo") = "bar"
* application("vartime")=""
* <p><!--#include file="wisdom.inc"--></p>
* <!--#include file ="somefilename"-->
* <!--#include virtual="somefilename"-->
* Request.ServerVariables
* Server.Transfer

[Global.asa](http://www.w3schools.com/asp/asp_globalasa.asp)

<%@ language="javascript"%>
<html>
  <body>
    <% Response.Write("Hello World!") %>
  </body>
</html>

Global.asa example:

<script language="vbscript" runat="server">

sub Application_OnStart
'some code
end sub

sub Application_OnEnd
'some code
end sub

sub Session_OnStart
'some code
end sub

sub Session_OnEnd
'some code
end sub

</script>

<script language="vbscript" runat="server">

Sub Application_OnStart
Application("visitors")=0
End Sub

Sub Session_OnStart
Application.Lock
Application("visitors")=Application("visitors")+1
Application.UnLock
End Sub

Sub Session_OnEnd
Application.Lock
Application("visitors")=Application("visitors")-1
Application.UnLock
End Sub

</script>
