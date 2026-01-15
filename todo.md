Bugs found:
TGM2 Normal:
The 6x bonus for line clears arent applied, and the score is calculated as if it was not applied. (The TGM2 scoring system applies a 6x multiplier for line clears in Normal mode. Make sure the mode is using TGM2's score calculation system as well.)
The time-based bonus when reaching the credits roll is also not applied.
FREE FALL and DEL EVEN powerup minos are not being spawned at all.

The Credits Roll dont play. Instead, only the GAME OVER text is displayed as well as the piece faing sequence.
Intended behavior: The Credits Roll should play, whilist retaining the current stack's visibility and state (disable the fading sequence) and the GAME OVER text should not be displayed.

TGM3 Easy:
In Credits roll, the stack isnt cleared, no pieces are visible (both active and the stack). Local leaderboards are incorrectly displaying and sorted by score instead of Hanabi.

All Standard modes (Ultra/Sprint/Marathon) except Zen:
Use an incorrect randomizer (should be 7-bag)
B2B x0 text lingers from Ready/Go sequence until the first piece is placed (it should not.)
T-Spin detection is incorrect, triggering false negatives from the 3-corner setups.

TGM1:
The Credits Roll dont play. Instead, only the GAME OVER text is displayed as well as the piece faing sequence.
Intended behavior: The Credits Roll should play, whilist retaining the current stack's visibility and state (disable the fading sequence) and the GAME OVER text should not be displayed.


