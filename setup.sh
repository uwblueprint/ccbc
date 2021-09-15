#!/bin/bash

vault_path_replacement_str="s|^vault_path=.*|vault_path=\"$1\"|g"
default_branch_replacement_str="s|^default_branch=.*|default_branch=\"$2\"|g"

# MacOS
if [[ $OSTYPE =~ darwin.* ]]; then
    sed -i "" -e $vault_path_replacement_str ./hooks/post-merge
    sed -i "" -e $default_branch_replacement_str ./hooks/post-merge
else
    sed -i $vault_path_replacement_str ./hooks/post-merge
    sed -i $default_branch_replacement_str ./hooks/post-merge
fi
cp ./hooks/post-merge ./.git/hooks/post-merge
