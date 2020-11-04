<?php include "top.html";
$name = $_REQUEST["name"];

#check mimimum compatibility needed for matches
function jung_similarities($first_user, $second_user)
{
    for ($i = 0; $i < strlen($first_user); $i++) {
        if (!strcmp($first_user[$i], $second_user[$i]))
            return 1;
    }
    return 0;
}

# check compatibility between users using parameters given via registration;
# many variables used only to improve code readibility, list can be substited with arrays
function check_compatibility($user_info, $line)
{
    list(
        $candidate_name, $candidate_gender, $candidate_age, $candidate_jung_type, $candidate_fav_OS,
        $candidate_min_age, $candidate_max_age, $candidate_pref_gender
    ) = explode(",", $line);

    list(
        $user_name, $user_gender, $user_age, $user_jung_type, $user_fav_OS, $user_min_age,
        $user_max_age, $user_pref_gender
    ) = explode(",", $user_info);

    # exit if users are the same
    if (!strcmp($user_name, $candidate_name))
        return 0;

    # gender and age compatibility for both sides can be enabled;
    # it may be too "strict" for certain users, uncomment the second
    # block of comments in each if statement to try it out
    if (
        !strcmp($user_pref_gender, "B") && $user_pref_gender != $candidate_gender
        # && (!strcmp($candidate_pref_gender, "B") || $candidate_pref_gender != $user_gender)
    )
        return 0;

    if (
        $user_min_age <= $candidate_age && $user_max_age >= $candidate_age
        # && $candidate_min_age <= $user_age && $candidate_max_age >= $user_age
        && $user_fav_OS == $candidate_fav_OS
        && jung_similarities($user_jung_type, $candidate_jung_type)
    ) {
        return 1;
    } else {
        return 0;
    }
}

#find  matches for given user
function get_matches($user_name)
{
    $lines = file("singles.txt");

    foreach ($lines as $line) {
        $curr_user = explode(",", $line);
        if (!strcmp($curr_user[0], $user_name)) { # safer than strpos in case additional infos get included
            $user_info = $line;
            break;
        }
    }

    $matches = array();
    foreach ($lines as $line) {
        if (check_compatibility($user_info, $line))
            $matches[] = $line;
    }
    return $matches;
}

# debug
$array = get_matches($name);
echo '<pre>';
print_r($array);
echo '</pre>';
?>
<?php include "bottom.html"; ?>
