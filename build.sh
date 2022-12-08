#!/bin/sh
TARGET="${TARGET:-./distribution}" # Where pleroma’s repository is sitting
mkdir -p $TARGET/emoji

die() {
	echo "Die: $@"
	exit 1
}

[ -d "${TARGET}" ] || die "${TARGET} directory is missing, are you sure TARGET is set to a pleroma repository? (Info: TARGET=${TARGET} )"

yarn install -D || die "Installing dependencies via yarn failed"

rm -rf public/packs public/assets
env -i "PATH=$PATH" npm run build || die "Building the frontend failed"
cp public/packs/sw.js "${TARGET}/sw.js" || die "installing sw.js (service-worker) failed"
rm -rf "${TARGET}/packs" || die "Removing old assets in priv/static/packs failed"
cp -r public/packs "${TARGET}/packs" || die "Copying new assets in priv/static/packs failed"
rm -rf "${TARGET}/emoji/*.svg" || die "Removing the old emoji assets failed"
cp -r public/emoji/* "${TARGET}/emoji" || die "Installing the new emoji assets failed"
