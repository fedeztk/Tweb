<!--
Simple login page, redirects to matches-submit.php to show matches
-->
<?php include "top.html"; ?>

<form action="matches-submit.php" method="get">
    <fieldset>
        <legend>Returning User:</legend>
        <label><strong>Name:</strong></label>
        <input type="text" name="name" size="16" maxlength="16" />

        <p>
            <input type="submit" value="View My Matches">
        </p>

    </fieldset>
</form>

<?php include "bottom.html"; ?>
