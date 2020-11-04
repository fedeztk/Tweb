<?php include "top.html"; ?>

<form action="signup-submit.php" method="post">
    <fieldset>

        <legend>New User Singup:</legend>
        <label class="left"> <strong>Name:</strong> </label>
        <input name="name" type="text" size="16" maxlength="16"></input>
        <br />

        <label class="left"> <strong>Gender:</strong> </label>
        <input name="gender" type="radio" value="M" /> Male
        <input name="gender" type="radio" value="F" checked="checked" /> Female
        <br />

        <label class="left"> <strong>Age:</strong> </label>
        <input name="age" type="text" size="6" maxlength="2"></input>
        <br />

        <label class="left"> <strong>Personality type:</strong> </label>
        <input name="jung_type" type="text" size="6" maxlength="4"></input>
        (<a href="http://www.humanmetrics.com/cgi-win/JTypes2.asp">Don't know your type?</a>)
        <br />

        <label class="left"> <strong>Favorite OS:</strong> </label>
        <select name="fav_OS" size="1">
            <option>Windows</option>
            <option>Mac OS X</option>
            <option selected="selected">Linux</option>
        </select>
        <br />

        <label class="left"> <strong>Seeking age:</strong> </label>
        <input name="min_age" type="text" placeholder="20" size="6" maxlength="2"></input>
        to
        <input name="max_age" type="text" placeholder="45" size="6" maxlength="2"></input>
        <br />

        <label><strong>Looking for...</strong></label>
        <input type="radio" value="B" name="pref_gender" checked="checked" />Both genders
        <input type="radio" value="M" name="pref_gender" />Male
        <input type="radio" value="F" name="pref_gender" />Female

        <p>
            <input type="submit" value="Sign Up">
        </p>

    </fieldset>
</form>

<?php include "bottom.html"; ?>
