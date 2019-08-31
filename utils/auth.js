export function getToken(){
	return uni.getStorageSync('access_token')
}

export function removeToken(){
	console.log('reomi')
	return uni.removeStorageSync('access_token');
}

export function getYuMing(){
	return uni.getStorageSync('yuming');
}

export function removeYuMing(){
	return uni.removeStorageSync('yuming');
}

export function setStorageSync(key,value){
	return uni.setStorageSync(key,value);
}
export function yh_getStorage(key){
	return uni.getStorageSync(key);
}
export function yh_removeStorage(key){
	return uni.removeStorageSync(key);
}