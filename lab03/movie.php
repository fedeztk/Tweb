<!-- TODO:
fix indentation
create personal film review
-->
<?php
include("top.html");
//movie query
$movie = $_GET["film"];
// movie info
list($movie_title, $movie_year, $movie_rate) = file("$movie/info.txt");
// movie overview 
$overiew_lines = file("$movie/overview.txt", FILE_IGNORE_NEW_LINES);
// movie reviewes file names
$rev_files = glob("$movie/review*.txt");
?>

<h1> <?= $movie_title ?>(<?= trim($movie_year) ?>)</h1>

<!-- main cointains left and right columns-->
<div id="main">
    <div id="right">
        <div>
            <img src="<?= $movie ?>/overview.png" alt="general overview" />
        </div>
        <dl>
            <?php
            foreach ($overiew_lines as $cur_line) {
                $movie_def = explode(":", $cur_line); ?>
                <dt> <?= $movie_def[0] ?>
                <dt>
                <dd> <?= $movie_def[1] ?></dd>
            <?php
            } ?>
        </dl>
    </div> <!-- closing div "right" -->

    <div id="left">
        <div id="left-top">
            <?php
            if ($movie_rate <= 60) {
            ?>
                <img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/rottenbig.png" alt="Rotten" />
                <span class="evaluation"> <?= $movie_rate ?>%</span>
            <?php
            } else {
            ?>
                <img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/freshbig.png" alt="Fresh" />
                <span class="evaluation"> <?= $movie_rate ?>%</span>
            <?php
            }
            ?>
        </div>
        <div id="columns">
            <?php
            $num_rev = count($rev_files);
            $num_rev_display = $num_rev > 10 ? 10 : $num_rev;
            ?>
            <div id="leftcolumn">
                <?php
                $left_col_rev = ($num_rev_display + 1) / 2;
                for ($i = 0; $i < $left_col_rev - 1; $i++) {
                    list($review, $rating, $reviewer, $pub) = file($rev_files[$i], FILE_IGNORE_NEW_LINES);
                ?>
                    <p class="quotes">
                        <span>
                            <?php
                            if ($rating == "ROTTEN") {
                            ?>
                                <img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/rotten.gif" alt="Rotten" />
                            <?php
                            } else {
                            ?>
                                <img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/fresh.gif" alt="Fresh" />
                            <?php
                            }
                            ?>
                            <q> <?= $review ?> </q>
                        </span>
                    </p>
                    <p class="reviewers">
                        <img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/critic.gif" alt="Critic" />
                        <?= $reviewer ?> <br />
                        <span class="publications"> <?= $pub ?></span>
                    </p>
                <?php
                } ?>
            </div><!-- closing div "leftcolumn" -->
            <div id="rightcolumn">
                <?php
                for ($j = $left_col_rev; $j < $num_rev_display; $j++) {
                    list($review, $rating, $reviewer, $pub) = file($rev_files[$j], FILE_IGNORE_NEW_LINES);
                ?>
                    <p class="quotes">
                        <span>
                            <?php
                            if ($rating == "ROTTEN") {
                            ?>
                                <img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/rotten.gif" alt="Rotten" />
                            <?php
                            } else {
                            ?>
                                <img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/fresh.gif" alt="Fresh" />
                            <?php
                            }
                            ?>
                            <q> <?= $review ?> </q>
                        </span>
                    </p>
                    <p class="reviewers">
                        <img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/critic.gif" alt="Critic" />
                        <?= $reviewer ?> <br />
                        <span class="publications"> <?= $pub ?></span>
                    </p>
                <?php
                } ?>
            </div><!-- closing div "rightcolumn" -->
        </div><!-- closing div "columns" -->
    </div><!-- closing div "left" -->
    <p id="bottom">(1-<?= $num_rev_display ?>) of <?= $num_rev ?></p>
</div> <!-- closing div "main" -->
<div id="validators">
    <a href="http://validator.w3.org/check/referer">
        <img width="88" src="https://upload.wikimedia.org/wikipedia/commons/b/bb/W3C_HTML5_certified.png " alt="Valid HTML5!" />
    </a>
    <br />
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Valid CSS!" />
    </a>
</div>
<!-- closing div "validators" -->

</body>

</html>
