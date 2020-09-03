#!/bin/bash

jq \
  ``"to_entries"`
  `"|map("`
  `'.key as $firstKey | .value as $firstValue | if $firstValue != "" then ($firstValue | to_entries | map(.key as $secondKey | .value as $secondValue | $secondValue | to_entries | map(.key as $thirdKey | .value as $thirdValue | $firstKey $thirdValue | ))) else . end)|.[]'` <&0
