<?php
// logout the user and clean session data
include('util.php');
session_unset();
session_destroy();
session_start();
