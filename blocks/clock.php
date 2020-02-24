<div id="time">
<?php 
date_default_timezone_set("Europe/Rome");
$time=date("H:i");
$date=date("D, j M");
echo '<h1>'.$time.'</h1>';
echo '<span>'.$date.'</span>';

?>
</div>