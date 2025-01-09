ENV='production'

#!/usr/bin/env bash
# cd vue
rm -fr dist
npm install
npm run build
#cd ../

 LOCAL_IMAGE_NAME=prism/website:$ENV
#  ECR_REPO=207675869076.dkr.ecr.us-east-1.amazonaws.com/prism-vue-website-$ENV // this will be for when we have dev/sandbox. need to setup new repo on aws
 ECR_REPO=207675869076.dkr.ecr.us-east-1.amazonaws.com/prism-vue-website # this is copied from aws repo

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 207675869076.dkr.ecr.us-east-1.amazonaws.com
docker build --platform=linux/amd64 -t $LOCAL_IMAGE_NAME .
docker tag $LOCAL_IMAGE_NAME $ECR_REPO
docker push $ECR_REPO
