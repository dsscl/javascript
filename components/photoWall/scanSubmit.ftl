<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>上传文件</title>
		<link rel="icon" type="images/png" href="/images/common/title.ico">
		<link href="/plugins/bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
		<!-- file upload css -->
		<!--<link rel="stylesheet" href="/plugins/file-upload/fileinput.min.css">-->
		<link rel="stylesheet" href="/plugins/jQuery-viewer/viewer.min.css">
		<link href="/css/common/layer-self.css" rel="stylesheet" media="screen">
		<link href="/css/common/layer.css" rel="stylesheet" media="screen">
		<link rel="stylesheet" type="text/css" href="/css/pc/furtherEducation/public.css?v=${(south_resources_version_css)!}" />
		<link rel="stylesheet" type="text/css" href="/css/pc/furtherEducation/scanSubmit.css?v=${(south_resources_version_css)!}" />
		<style type="text/css">
			.nav li:nth-of-type(1) {
				border-bottom: 4px solid #0079d7;
			}

			.kv-file-remove {
				display: none;
			}
		</style>
		<script src="/plugins/jQuery/jquery.min.js"></script>
	</head>

	<body>
		<div class="container">
			<div id="head">
				<#include "/pc/furtherEducation/header.ftl"/>
			</div>

			<div class="progress-msg">
				<img src="/images/furtherEducationPc/progress3.jpg" />
			</div>
			<div class="guide">
				<img src="/images/furtherEducationPc/u28.png" />
				<span>基本信息已填写完毕，请您下载并打印申请表至送选单位审核并盖相应公章</span>
			</div>
			<div class="msg">
				<div id="oldMsg"></div>
				<b id="advancedConfig" class='notice'></b>
				<!--迭代之后的证件上传，scanSubmit.js-->
                <div class="uploadForm">
                    <h4 class="please">请上传审核盖章后的申请表：</h4>
                    <div class="exptPhotoWrap bordernone">
                        <input type="file" multiple class="fileInput" id="uploadInput1" onchange="uploadImg(1)">
                        <img src="/images/furtherEducationPc/icon-addfile_03.jpg" width="120" height="120" />
                    </div>
					<ul id="uploadList1">
					</ul>
                </div>
                <div class="uploadForm">
                    <h4 class="please">请上传毕业证书：</h4>
                    <div class="exptPhotoWrap bordernone">
                        <input type="file" multiple class="fileInput" id="uploadInput2" onchange="uploadImg(2)">
                        <img src="/images/furtherEducationPc/icon-addfile_03.jpg" width="120" height="120" />
                    </div>
                    <ul id="uploadList2">
                    </ul>
                </div>
				<input type="hidden" value="${advancedType}">
                <div class="uploadForm">
				<!--<h4 class="please">请上传绿色封面的医师执业证书及其他证书：</h4>-->
					<#if advancedType == 1>
                    	<h4 class="please">请上传绿色封面的医师执业证书、红色封面的医师资格证书<span style="color: red">（均需照片页+姓名详细页）</span>及其他证书：</h4>
					<#else>
						<h4 class="please">请上传护士执业证书、职称证书<span style="color: red">（均需照片页+姓名详细页+注册有效期页）</span>及其他证书</h4>
					</#if>
                    <div class="exptPhotoWrap bordernone">
                        <input type="file" multiple class="fileInput" id="uploadInput3" onchange="uploadImg(3)">
                        <img src="/images/furtherEducationPc/icon-addfile_03.jpg" width="120" height="120" />
                    </div>
                    <ul id="uploadList3">
                    </ul>
                </div>

				<!--迭代之前的证件上传，file-upload插件 + scanSubmit1.js-->
                <!--<div id="submitContainerLeft">
                    <h4 class="please">请上传审核盖章后的申请表：</h4>
                    <br>
                    <input id="scanSubmit1" type="file" multiple class="file-loading">
                    <ul id="imgList1" style="display: none;">
                    </ul>
                </div>
                <div id="submitContainerMiddle">
                    <h4 class="please">请上传毕业证书：</h4>
                    <br>
                    <input id="scanSubmit3" type="file" multiple class="file-loading">
                    <ul id="imgList3" style="display: none;">
                    </ul>
                </div>
                <div id="submitContainerRight">
                    <h4 class="please">请上传绿色封面的医师执业证书及其他证书：</h4>
                    <input id="scanSubmit2" type="file" multiple class="file-loading">
                    <ul id="imgList2" style="display: none;">
                    </ul>
                </div>-->

				<div class="step">
					<button class="btn" id="prev" onclick="prevStep()">上一步</button>
					<a class="btn btn-primary" id="next" onclick="submitScan(this)">上传完成，确认提交</a>
				</div>
			</div>

			<!--图片示例-->
			<div class="example">
				<div class="example1">
					<b>正确的进修生申请表扫描版：清晰、盖有医院公章。</b>
					<div class="example-pic">
						<img src="/images/furtherEducationPc/scan_wrong.jpg" />
					</div>
					<div class="example-pic">
						<img src="/images/furtherEducationPc/scan_right.jpg" />
					</div>
				</div>
				<div class="example2">
					<div class="doctor-show">
						<b>正确的毕业证书：需清晰、能够查看全部信息</b>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate2-1.jpg" />
						</div>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate4.jpg" />
						</div>
					</div>
				</div>
				<div class="example2">
					<div class="doctor-show">
						<b>正确的执业医师注册证：需能查看全部信息：照片、执业范围、编码、变更注册记录等。</b>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate1.jpg" />
						</div>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate2.jpg" />
						</div>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate3.jpg" />
						</div>
					</div>
					<div class="nurse-show">
						<b>正确的护士执业证书（与毕业证书）需能查看全部信息：照片、执业范围、编码、变更注册记录等。</b>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate2-1.jpg" />
						</div>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate2-2.jpg" />
						</div>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate2-3.jpg" />
						</div>
						<div class="example-pic">
							<img src="/images/furtherEducationPc/certificate2-4.jpg" />
						</div>
					</div>
				</div>

			</div>

		</div>
		<#include "/pc/furtherEducation/footer.ftl"/>

		<script src="/plugins/bootstrap/js/bootstrap.min.js"></script>
		<!-- file upload js-->
		<!--<script type='text/javascript' src='/plugins/file-upload/fileinput.js'></script>-->
		<script type='text/javascript' src='/plugins/jQuery-viewer/viewer-jquery.js'></script>
		<script type='text/javascript' src='/plugins/file-upload/locales/zh.js'></script>
		<script type='text/javascript' src='/plugins/lrz.bundle.js'></script>
		<script src="/js/common/layer.js"></script>
		<script type='text/javascript' src='/js/pc/furtherEducation/scanSubmit.js?v=${(south_resources_version_js)!}'></script>
		<script>
			$(document).ready(function() {
                $("#uploadList1").children('li').length <= 0 || $("#uploadList1").viewer()
				$("#uploadList2").children('li').length <= 0 || $("#uploadList2").viewer()
				$("#uploadList3").children('li').length <= 0 || $("#uploadList3").viewer()
			})
		</script>
	</body>

</html>
