<template>
	<view class="login">
		<view class="login_box">
			<view class="login_title text_center">
				<view class="login_title_con">AI智能客服系统</view>
				<text class="login_title_versions">V4.2.0</text>
			</view>
			<form>
				<view class="uni-form-item uni-column yuming ">
					<view class="with-fun border-b">
						<input class="uni-input " placeholder="请输入域名" :value="yuming" @input="clearIp" />
						<view class="uni-icon uni-icon-clear text_center" v-if="showIp" @click="clearIcon('0')"></view>
					</view>
				</view>
				<view class="uni-form-item uni-column login_username ">
					<view class="with-fun border-b">
						<input class="uni-input " placeholder="请输入账号" :value="username" @input="clearInput" />
						<view class="uni-icon uni-icon-clear text_center" v-if="showClearIcon" @click="clearIcon('1')"></view>
					</view>
				</view>
				<view class="uni-form-item uni-column login_pws margin-b30">
					<view class="with-fun border-b">
						<input type="password" class="uni-input " placeholder="请输入密码" :value="password" @input="clearpws" />
						<view class="uni-icon uni-icon-clear text_center" v-if="showPasswordL" @click="clearIcon('2')"></view>
					</view>
				</view>
				<view class="login_sub margin-b30" :disabled="isCommit" :class="{commit:isCommit}" @click="loginto"><button>登入</button></view>
				<view class="login_agreement text_center">
					<checkbox-group @change="checkboxChange">
						<checkbox value="checkbox3" :checked="flag" />
						我已阅读并同意AI智能客服
						<text class="login_agreement_layer" @click="togglePopup('top')">用户协议</text>
					</checkbox-group>
				</view>
			</form>
		</view>
		<popup-layer ref="popup" :direction="direction">
			<view class="zidingyi">
				<view class="text_center agreement_title">AI智能客服用户协议</view>
				<view class="one_title">温馨提示:</view>
				<view class="agreement_content">
					AI智能客服平台在此特别提醒您（用户）在使用户之前，请认真阅读本《用户协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权登录或使用本协议所涉服务。您的登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。本协议约定AI智能客服系统与用户之间关于“AI智能客服系统”软件服务（以下简称“服务”）的权利义务。“用户”是指登录、使用本服务的个人或企业。本协议可由AI智能客服系统随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本网站查阅最新版协议条款。在AI智能客服系统修改协议条款后，如果用户不接受修改后的条款，请立即停止使用AI智能客服系统提供的服务，用户继续使用AI智能客服系统提供的服务将被视为接受修改后的协议。
				</view>
				<view class="one_title">一、服务内容</view>
				<view class="agreement_content">
					1、AI智能客服系统可以对其提供的服务予以变更，且AI智能客服系统提供的服务内容可能随时变更；用户将会收到关于服务变更的通知。
					<br />
					2、AI智能客服系统提供的服务包含免费服务与收费服务。用户可以通过付费方式购买收费服务，对于收费服务，AI智能客服系统会在用户使用之前给予用户明确的提示，只有用户根据提示确认其同意按照前述支付方式支付费用并完成了支付行为，用户才能使用该等收费服务。支付行为的完成以银行或第三方支付平台生成“支付已完成”的确认通知为准。
					<br />
				</view>
				<view class="one_title">二、用户个人信息保护</view>

				<view class="agreement_content">
					1、用户个人信息包括：
					<br />
					1）用户自行提供的用户个人信息；2）其他方分享的用户个人信息；3）AI智能客服系统为提供服务而合法收集的用户必要个人信息（如使用服务时系统自动采集的设备或软件信息，浏览历史信息，通讯时间信息等技术信息，用户开启定位功能并使用服务时的地理位置信息等）。
					其中个人隐私信息是指涉及用户个人身份或个人隐私的信息，比如，用户真实姓名、身份证号、手机号码、手机设备识别码、IP地址。非个人隐私信息是指用户对本服务的操作状态以及使用习惯等明确且客观反映在AI智能客服系统服务器端的基本记录信息、个人隐私信息范围外的其它普通信息，以及用户同意公开的上述隐私信息。AI智能客服系统保证在取得用户书面同意的情况下收集、使用或公开用户的个人隐私信息，用户同意AI智能客服系统无需获得用户的另行确认与授权即可收集、使用或公开用户的非个人隐私信息。
					<br />
					2、尊重用户个人信息的私有性是AI智能客服系统的一贯制度，AI智能客服系统将采取技术措施和其他必要措施，确保用户个人信息安全，防止在本服务中收集的用户个人信息泄露、毁损或丢失。在发生前述情形或者AI智能客服系统发现存在发生前述情形的可能时，AI智能客服系统将及时采取补救措施并告知用户，用户如发现存在前述情形亦需立即与AI智能客服系统联系。
					<br />
					3、AI智能客服系统未经用户同意不向任何第三方公开、 透露用户个人隐私信息。但以下特定情形除外：
					<br />
					(1) AI智能客服系统根据法律法规规定或有权机关的指示提供用户的个人隐私信息； (2)
					由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的任何个人信息的泄漏，或其他非因AI智能客服系统原因导致的个人隐私信息的泄露； (3)
					用户自行向第三方公开其个人隐私信息； (4)
					用户与AI智能客服系统及合作单位之间就用户个人隐私信息的使用公开达成约定，AI智能客服系统因此向合作单位公开用户个人隐私信息； (5)
					任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露； (6) 用户个人信息已经经过处理无法识别特定个人且不能复原。
					<br />
					4、用户同意AI智能客服系统可在以下事项中使用用户的个人隐私信息： (1) AI智能客服系统向用户及时发送重要通知，如软件更新、本协议条款的变更； (2)
					AI智能客服系统内部进行审计、数据分析和研究等，以改进AI智能客服系统的产品、服务和与用户之间的沟通； (3)
					依本协议约定，AI智能客服系统管理、审查用户信息及进行处理措施； (4) 适用法律法规规定的其他事项。
					除上述事项外，如未取得用户事先同意，AI智能客服系统不会将用户个人隐私信息使用于任何其他用途。
					<br />
					5、为了改善AI智能客服系统的技术和服务，向用户提供更好的服务体验，AI智能客服系统或可会自行收集使用或向第三方提供用户的非个人隐私信息。
					<br />
					6、AI智能客服系统保证在合法、正当与必要的原则下收集、使用或者公开用户个人信息且不会收集与提供的服务无关的用户个人信息。
				</view>
				<view class="one_title">三、内容规范</view>
				<view class="agreement_content">
					1、本条所述内容是指用户使用本服务过程中所制作、上载、复制、发布、的任何内容，包括但不限于帐号头像、名称、用户说明等认证资料，或文字、语音、图片、视频、图文等发送、回复或自动回复消息和相关链接页面，以及其他使用帐号或本服务所产生的内容。
					<br />
					2、用户不得利用“AI智能客服系统”帐号或本服务制作、上载、复制、发布、传播如下法律、法规和政策禁止的内容： (1) 反对宪法所确定的基本原则的； (2)
					危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的； (3) 损害国家荣誉和利益的； (4) 煽动民族仇恨、民族歧视，破坏民族团结的； (5)
					破坏国家宗教政策，宣扬邪教和封建迷信的； (6) 散布谣言，扰乱社会秩序，破坏社会稳定的； (7) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的； (8)
					侮辱或者诽谤他人，侵害他人合法权益的； (9)
					不遵守法律法规底线、社会主义制度底线、国家利益底线、公民合法权益底线、社会公共秩序底线、道德风尚底线和信息真实性底线的“七条底线”要求的； (10)
					含有法律、行政法规禁止的其他内容的信息。
					<br />
					3、用户不得利用“AI智能客服系统”帐号或本服务制作、上载、复制、发布、传播如下干扰“AI智能客服系统”正常运营，以及侵犯其他用户或第三方合法权益的内容： (1)
					含有任何性或性暗示的； (2) 含有辱骂、恐吓、威胁内容的； (3) 含有骚扰、垃圾广告、恶意信息、诱骗信息的； (4) 涉及他人隐私、个人信息或资料的； (5)
					侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的； (6) 含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容的信息。
				</view>
				<view class="one_title">四、使用规则</view>
				<view class="agreement_content">
					1、用户在本服务中或通过本服务所传送、发布的任何内容并不反映或代表，也不得被视为反映或代表AI智能客服系统的观点、立场或政策，AI智能客服系统对此不承担任何责任。
					<br />
					2、用户不得利用“AI智能客服系统”帐号或本服务进行如下行为： (1) 提交、发布虚假信息，或盗用他人头像或资料，冒充、利用他人名义的； (2)
					强制、诱导其他用户关注、点击链接页面或分享信息的； (3) 虚构事实、隐瞒真相以误导、欺骗他人的； (4) 利用技术手段批量建立虚假帐号的； (5)
					利用“AI智能客服系统”帐号或本服务从事任何违法犯罪活动的； (6)
					制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的； (7)
					其他违反法律法规规定、侵犯其他用户合法权益、干扰“AI智能客服系统”正常运营或AI智能客服系统未明示授权的行为。
					<br />
					3、用户须对利用“AI智能客服系统”帐号或本服务传送信息的真实性、合法性、无害性、准确性、有效性等全权负责，与用户所传播的信息相关的任何法律责任由用户自行承担，与AI智能客服系统无关。如因此给AI智能客服系统或第三方造成损害的，用户应当依法予以赔偿。
					<br />
					4、AI智能客服系统提供的服务中可能包括广告，用户同意在使用过程中显示AI智能客服系统和第三方供应商、合作伙伴提供的广告。除法律法规明确规定外，用户应自行对依该广告信息进行的交易负责，对用户因依该广告信息进行的交易或前述广告商提供的内容而遭受的损失或损害，AI智能客服系统不承担任何责任。
					<br />
					5、除非AI智能客服系统书面许可，用户不得从事下列任一行为： (1) 删除软件及其副本上关于著作权的信息； (2)
					对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现软件的源代码； (3)
					对AI智能客服系统拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等； (4)
					对软件或者软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经AI智能客服系统授权的第三方工具/服务接入软件和相关系统；
					(5) 通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的；
					(6)
					通过非AI智能客服系统开发、授权的第三方软件、插件、外挂、系统，登录或使用AI智能客服系统软件及服务，或制作、发布、传播非AI智能客服系统开发、授权的第三方软件、插件、外挂、系统。
				</view>
				<view class="one_title">五、账户管理</view>
				<view class="agreement_content">
					1、
					“AI智能客服系统”帐号的所有权归AI智能客服系统所有，获得“AI智能客服系统”帐号的使用权，该使用权仅属于初始申请人，禁止赠与、借用、租用、转让或售卖。AI智能客服系统因经营需要，有权回收用户的“AI智能客服系统”帐号。
					<br />
					2、用户可以通过1）查看与编辑个人资料页，2）更改“AI智能客服系统”帐户上的个人基本信息及传送内容等，但需注意，删除有关信息的同时也会删除用户储存在系统中的文字和图片。用户需承担该风险。
					<br />
					3、用户有责任妥善保管帐号信息及帐号密码的安全，因用户保管不善可能导致遭受盗号或密码失窃，责任由用户自行承担。用户需要对帐号以及密码下的行为承担法律责任。用户同意在任何情况下不使用其他用户的帐号或密码。在用户怀疑他人使用其帐号或密码时，用户同意立即通知AI智能客服系统。
					<br />
					4、用户应遵守本协议的各项条款，正确、适当地使用本服务，如因用户违反本协议中的任何条款，AI智能客服系统在通知用户后有权依据协议中断或终止对违约用户“AI智能客服系统”帐号提供服务。同时，AI智能客服系统保留在任何时候收回“AI智能客服系统”帐号、用户名的权利。
					<br />
					5、如用户“AI智能客服系统”帐号后一年不登录，通知用户后，AI智能客服系统可以收回该帐号，以免造成资源浪费，由此造成的不利后果由用户自行承担。
				</view>
				<view class="one_title">六、数据储存</view>
				<view class="agreement_content">
					1、AI智能客服系统不对用户在本服务中相关数据的删除或储存失败负责。
					<br />
					2、AI智能客服系统可以根据实际情况自行决定用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。用户可根据自己的需要自行备份本服务中的相关数据。
					<br />
					3、如用户停止使用本服务或本服务终止，AI智能客服系统可以从服务器上永久地删除用户的数据。本服务停止、终止后，AI智能客服系统没有义务向用户返还任何数据。
				</view>
				<view class="one_title">七、风险承担</view>
				<view class="agreement_content">
					1、用户理解并同意，“AI智能客服系统”仅为用户提供信息分享、传送及获取的平台，用户必须为自己帐号下的一切行为负责，包括用户所传送的任何内容以及由此产生的任何后果。用户应对“AI智能客服系统”及本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。AI智能客服系统无法且不会对因用户行为而导致的任何损失或损害承担责任。
					如果用户发现任何人违反本协议约定或以其他不当的方式使用本服务，请立即向AI智能客服系统举报或投诉，举报或投诉电话为400-777-9908，AI智能客服系统将依本协议约定进行处理。
					<br />
					2、用户理解并同意，因业务发展需要，AI智能客服系统保留单方面对本服务的全部或部分服务内容变更、暂停、终止或撤销的权利，用户需承担此风险。
				</view>
				<view class="one_title">八、知识产权声明</view>
				<view class="agreement_content">
					1、除本服务中涉及广告的知识产权由相应广告商享有外，AI智能客服系统在本服务中提供的内容（包括但不限于网页、文字、图片、音频、图表等）的知识产权均归AI智能客服系统所有，但用户在使用本服务前对自己发布的内容已合法取得知识产权的除外。
					<br />
					2、除另有特别声明外，AI智能客服系统提供本服务时所依托软件的著作权、专利权及其他知识产权均归AI智能客服系统所有。
					<br />
					3、AI智能客服系统在本服务中所涉及的图形、文字或其组成，以及其他AI智能客服系统标志及产品、服务名称（以下统称“AI智能客服系统标识”），其著作权或商标权归AI智能客服系统所有。未经AI智能客服系统事先书面同意，用户不得将AI智能客服系统标识以任何方式展示或使用或作其他处理，也不得向他人表明用户有权展示、使用、或其他有权处理AI智能客服系统标识的行为。
					<br />
					4、上述及其他任何AI智能客服系统或相关广告商依法拥有的知识产权均受到法律保护，未经AI智能客服系统或相关广告商书面许可，用户不得以任何形式进行使用或创造相关衍生作品。
				</view>
				<view class="one_title">九、法律责任</view>
				<view class="agreement_content">
					1、甲方同意并接受本协议的相关规定，合法合规使用本软件,并保证不用于骚扰类盲打电话外呼用途。甲方不得利用本软件从事反党反国家以及其他违反国家法律、法规或侵犯第三方权益的活动。甲方将本软件用于外呼的，应当征得接听方同意，不得对接听方正常生活造成影响，接听方明确表示拒绝的，不得继续向其发起呼叫。否则由此产生的后果均由甲方承担，同时乙方有权终止本合同，拒绝为甲方提供产品账户的剩余服务期限，给乙方造成损失的，甲方应承担乙方所有损失，包括但不限于律师费、诉讼费、差旅费、鉴定费等一切相关费用。
					<br />
					2、如果AI智能客服系统发现或收到他人举报或投诉用户违反本协议约定的，AI智能客服系统有权不经通知随时对相关内容，包括但不限于用户资料、会话记录进行审查、删除，并视情节轻重对违规帐号处以包括但不限于警告、帐号封禁
					、设备封禁 、功能封禁 的处罚，且通知用户处理结果。
					<br />
					3、因违反用户协议被封禁的用户，可以自行到
					致电400-777-9908查询封禁期限，并在封禁期限届满后自助解封。其中，被实施功能封禁的用户会在封禁期届满后自动恢复被封禁功能。被封禁用户可向AI智能客服系统网站相关页面提交申诉，AI智能客服系统将对申诉进行审查，并自行合理判断决定是否变更处罚措施。
					<br />
					4、用户理解并同意，AI智能客服系统有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。
					<br />
					5、用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿AI智能客服系统与合作公司、关联公司，并使之免受损害。
				</view>
				<view class="one_title">十、不可抗力及其他免责事由</view>
				<view class="agreement_content">
					1、用户理解并确认，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，AI智能客服系统将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户或第三方造成的损失，AI智能客服系统及合作单位在法律允许的范围内免责。
					<br />
					2、本服务同大多数互联网服务一样，受包括但不限于用户原因、网络服务质量、社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料，造成现实生活中的骚扰；用户下载安装的其它软件或访问的其他网站中含有“特洛伊木马”等病毒，威胁到用户的计算机信息和数据的安全，继而影响本服务的正常使用等等。用户应加强信息安全及使用者资料的保护意识，要注意加强密码保护，以免遭致损失和骚扰。
					<br />
					3、用户理解并确认，本服务存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险，因此导致的用户或第三方任何损失，AI智能客服系统不承担任何责任。
					<br />
					4、用户理解并确认，在使用本服务过程中存在来自任何他人的包括误导性的、欺骗性的、威胁性的、诽谤性的、令人反感的或非法的信息，或侵犯他人权利的匿名或冒名的信息，以及伴随该等信息的行为，因此导致的用户或第三方的任何损失，AI智能客服系统不承担任何责任。
					<br />
					5、用户理解并确认，AI智能客服系统需要定期或不定期地对“AI智能客服系统”平台或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，AI智能客服系统无需为此承担任何责任，但AI智能客服系统应事先进行通告。
					<br />
					6、AI智能客服系统依据法律法规、本协议约定获得处理违法违规或违约内容的权利，该权利不构成AI智能客服系统的义务或承诺，AI智能客服系统不能保证及时发现违法违规或违约行为或进行相应处理。
					<br />
					7、用户理解并确认，对于AI智能客服系统向用户提供的下列产品或者服务的质量缺陷及其引发的任何损失，AI智能客服系统无需承担任何责任： (1)
					AI智能客服系统向用户免费提供的服务； (2) AI智能客服系统向用户赠送的任何产品或者服务。
					8、在任何情况下，AI智能客服系统均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，包括因用户使用“AI智能客服系统”或本服务而遭受的利润损失，承担责任（即使AI智能客服系统已被告知该等损失的可能性亦然）。尽管本协议中可能含有相悖的规定，AI智能客服系统对用户承担的全部责任，无论因何原因或何种行为方式，始终不超过用户因使用AI智能客服系统提供的服务而支付给AI智能客服系统的费用(如有)。
				</view>
				<view class="one_title">十一、服务的变更、中断、终止</view>
				<view class="agreement_content">
					1、如发生下列任何一种情形，AI智能客服系统有权变更、中断或终止向用户提供的免费服务或收费服务，而无需对用户或任何第三方承担任何责任： (1)
					根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或信息不一致又未能提供合理证明； (2) 用户违反相关法律法规或本协议的约定； (3)
					按照法律规定或有权机关的要求； (4) 出于安全的原因或其他必要的情形。
				</view>
				<view class="one_title">十二、其他</view>
				<view class="agreement_content">
					1、AI智能客服系统郑重提醒用户注意本协议中免除AI智能客服系统责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读本协议。
					<br />
					2、本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和AI智能客服系统之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交AI智能客服系统住所地有管辖权的人民法院管辖。
					<br />
					3、本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。
				</view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
	// 映射vuex
	import popupLayer from '@/components/popup-layer/popup-layer.vue';
	import {getYuMing,yh_getStorage} from '@/utils/auth.js'
	export default {
		components: {
			//注册为组件标签
			popupLayer
		},
		data() {
			return {
				loginForm:{
					
				},
				username:6221,
				password:123456,
				yuming:yh_getStorage('yuanshiyuming')||'',
				direction: 'top',
				title: 'CRM',
				checked: '',
				flag: 'true',
				showClearIcon: false,
				showPasswordL: false,
				showIp:false,
				isCommit:false
			};
		},
		onShow(){
			console.log(this.$store.state);
			this.$store.dispatch('task/setAddTaskFalg',true)
		},
		methods: {
			// 复选框勾选
			checkboxChange() {
				this.flag = !this.flag;
			},
			// 显示清空账号输入框内容图标
			clearInput: function(event) {
				this.username = event.target.value;
				if (event.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			// 显示清空密码输入框内容图标
			clearpws: function(event) {
				this.password = event.target.value;
				if (event.target.value.length > 0) {
					this.showPasswordL = true;
				} else {
					this.showPasswordL = false;
				}
			},
			clearIp:function(event){
				this.yuming = event.target.value;
				if (event.target.value.length > 0) {
					this.showIp = true;
				} else {
					this.showIp = false;
				}
			},
			// 清空账号或者密码输入框内容
			clearIcon: function(index) {
				if (index == '1') {
					this.username = '';
					this.showClearIcon = false;
				} else if (index == '2') {
					this.userpws = '';
					this.showPasswordL = false;
				}else if(index == '0'){
					this.yuming='';
					this.showIp=false;
				}
			},
			// 弹出层
			togglePopup(direction) {
				this.direction = direction;
				this.$refs.popup.show();
			},
			validate(tipText){
				uni.showToast({
					icon: 'none',
					title:tipText
				});
				this.isCommit=false;
				return;
			},
			// 登入方法
			loginto() {
				this.isCommit=true;
				const {yuming,username,password}=this
				// 前端验证表单
				if (!yuming) {
					this.validate('请输入域名')
				}else if(!username){
					this.validate('请输入用户名')	
				}else if(!password){
					this.validate('请输入密码')
				}else if(!this.flag){
					this.validate('请阅读并同意小A智能客服用户协议')
				}
				// 域名保存本地
				const yuanshiyuming=yuming
				uni.setStorageSync('yuanshiyuming', yuanshiyuming);
				// 域名处理为 https://前缀
				let newyuming=yuming
				if(newyuming.indexOf('https://')==-1){// 用户不输入前缀
					newyuming='https://'+ newyuming;
				}
				uni.setStorageSync('yuming', newyuming);
				
				this.$store.dispatch('user/login',{newyuming,username,password}).then(res=>{
					console.log(res,'登入页请求成功')
					if(res.data.code===1){
						uni.showToast({
							icon: 'none',
							title: "账号或者密码错误"
						});
						this.isCommit=false;
						return;
					}else if(res.data.code===0){
						this.$store.dispatch('user/getinitdata',res.data.data.access_token)		
							console.log(res.data.code)
						uni.switchTab({
							url: '/pages/tabBar/index/index',
						});
					}
				}).catch(err=>{
					this.isCommit=false;
				})
			},
			// 清空input输入框
			empty(type) {
				if (type == 'user') {
					this.username = '';
				} else if (type == 'pws') {
					this.userpws = '';
				};
			},
			
		}
	};
</script>

<style>
	.login {
		padding-top: 35%;
	}

	.login_box {
		width: 80%;
		padding: 22px 20px 25px;
		margin: 0 auto;
		box-shadow: 0 0 20px #d9e4e7;
		background-color: #fff;
		border-radius: 4px;
	}

	.login_title {
		margin-bottom: 40upx;
	}

	.login_title .login_title_con {
		font-size: 40upx;
		color: #3f95ff;
	}

	.login_title .login_title_versions {
		color: #bbbbbb;
	}

	.login_sub button {
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		background: #3690ff;
		color: #ffffff;
	}
	.login_sub.commit button{
		background: #eee;
		color:#000000;
	}
	.empty {
		z-index: 999;
		position: absolute;
		right: 10upx;
		top: 30upx;
		width: 40upx;
		height: 40upx;
		border-radius: 40upx;
		text-align: center;
		line-height: 40upx;
		background: #bebebe;
		color: #ffffff;
	}

	.login_agreement_layer {
		color: #3690ff;
		text-decoration: underline;
	}

	.zidingyi {
		background-color: #f8f8f8;
		padding: 80upx 220upx;
	}

	.agreement_title {
		padding: 30upx 0;
		font-size: 40upx;
	}

	.one_title {
		padding: 30upx 0;
	}

	.agreement_content {
		text-indent: 2em;
	}

	.uni-icon.uni-icon-clear:before {
		font-size: 20px;
		color: #cccccc;
	}

	.with-fun {
		height: 40px;
	}

	.uni-input {
		padding: 10px 0 0 0;
	}
</style>
