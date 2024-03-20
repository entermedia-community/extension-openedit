/*
 * Created on Feb 18, 2005
 */
package org.openedit.html;

import junit.framework.Test;
import junit.framework.TestSuite;

/**
 * @author cburkey
 *
 */
public class AllTests
{

	public static Test suite()
	{
		TestSuite suite = new TestSuite("Test for org.openedit.html");
		//$JUnit-BEGIN$
		//suite.addTestSuite(HtmlEditTest.class);
		
		//$JUnit-END$
		return suite;
	}
}
