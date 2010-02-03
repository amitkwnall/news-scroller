#!/bin/sh
# set the properties of files so they will be served properly from the svn repo
#
# 
# run from within the root dir. Eg
# build/fix_svn_props.sh

svn propdel svn:executable           index.html
svn propset svn:mime-type text/html  index.html

svn propdel svn:executable           mootools_1.1x_compatible/index.html
svn propset svn:mime-type text/html  mootools_1.1x_compatible/index.html                                    
