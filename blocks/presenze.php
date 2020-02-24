<ul class="today_pres">
<?php
for ($i = 0; $i < count($svil); ++$i) {
	echo '<li class="today_pres-svil'.$i.'"><ul>';
	echo '<li class="today_pres-name">'.$svil[$i].'</li>';
	echo '<li class="today_pres-status today_pres-status-'.$status[$i].'">'.$status[$i].'</li>';
	echo '</ul></li>';
}
?>
</ul>