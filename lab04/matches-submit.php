<?php include "top.html";
$name = $_REQUEST["name"];

# check mimimum compatibility needed for matches
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
    ) = explode(",", trim($line));

    list(
        $user_name, $user_gender, $user_age, $user_jung_type, $user_fav_OS, $user_min_age,
        $user_max_age, $user_pref_gender
    ) = explode(",", trim($user_info));

    # exit if users are the same
    if (!strcmp($user_name, $candidate_name))
        return 0;

    # gender and age compatibility for both sides can be enabled;
    # it may be too "strict" for certain users, uncomment the second
    # block of comments in each if statement to try it out
    if (
        (strcmp($user_pref_gender, "B") && strcmp($user_pref_gender, $candidate_gender))
        # || (strcmp($candidate_pref_gender, "B") && strcmp($candidate_pref_gender, $user_gender))
    )
        return 0; # if users don't share sexual preferences

    if (
        $user_min_age <= $candidate_age && $user_max_age >= $candidate_age
        # && $candidate_min_age <= $user_age && $candidate_max_age >= $user_age
        && $user_fav_OS == $candidate_fav_OS
        && jung_similarities($user_jung_type, $candidate_jung_type)
    )
        return 1;
    else # if the users are not compatible according to age and OS preferences
        return 0;
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
?>

<div class="match">
    <h1>Matches for <?= $name ?></h1>
    <?php
    $matches = get_matches($name);
    foreach ($matches as $match) {
        list(
            $match_name, $match_gender, $match_age, $match_jung_type, $match_fav_OS, $match_min_age,
            $match_max_age, $match_pref_gender
        ) = explode(",", $match);
    ?>
        <p>
            <?= $match_name ?>
            <img src="http://www.cs.washington.edu/education/courses/cse190m/12sp/homework/4/user.jpg" alt="matching_user">
        </p>
        <ul>
            <li><strong>gender:</strong><?= $match_gender ?></li>
            <li><strong>age:</strong><?= $match_age ?></li>
            <li><strong>type:</strong><?= $match_jung_type ?></li>
            <li><strong>OS:</strong><?= $match_fav_OS ?></li>
        </ul>
    <?php
    }
    ?>
</div>

<?php include "bottom.html"; ?>
